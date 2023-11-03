"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const base_utils_1 = require("../../utils/base.utils");
const stripe_customer_service_1 = require("./stripe-customer.service");
let StripeService = class StripeService {
    constructor(configService, stripeCustomerService) {
        this.configService = configService;
        this.stripeCustomerService = stripeCustomerService;
        const STRIPE_SK = this.configService.get('STRIPE_SK');
        this.stripe = new stripe_1.default(STRIPE_SK, {
            apiVersion: '2022-11-15',
        });
    }
    async createStripeIntent(body, user) {
        let customer = await this.stripeCustomerService.getCustomerByUserId(user.id);
        if (!customer) {
            const newCustomer = await this.stripe.customers.create({
                name: user.fullName,
                email: user.emailId,
            });
            customer = await this.stripeCustomerService.addCustomer(newCustomer, user.id);
        }
        const customerId = customer.customerId;
        const ephemeralKey = await this.stripe.ephemeralKeys.create({ customer: customerId }, { apiVersion: '2022-11-15' });
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                customer: customerId,
                payment_method_types: ['card'],
                amount: base_utils_1.BaseUtils.roundOff(body.amount * 100),
                currency: 'usd',
                capture_method: 'manual',
            });
            return {
                status: true,
                message: 'Stripe payment intent created',
                data: {
                    paymentIntent,
                    customerId,
                    ephemeralKey: ephemeralKey.secret,
                },
            };
        }
        catch (e) {
            throw new common_1.BadRequestException({
                status: false,
                message: (e === null || e === void 0 ? void 0 : e.message) || 'Unable to create payment intent, please try again.',
            });
        }
    }
    async getStripeConnectUrl(stripeAccountId) {
        const account = stripeAccountId
            ? { id: stripeAccountId }
            : await this.stripe.accounts.create({
                type: 'standard',
            });
        const accountLink = await this.stripe.accountLinks.create({
            account: account.id,
            refresh_url: this.configService.get('STRIPE_REFRESH_URL'),
            return_url: this.configService.get('STRIPE_REDIRECT_URL'),
            type: 'account_onboarding',
        });
        return Object.assign(Object.assign({}, accountLink), { stripeAccountId });
    }
    async capturePaymentByTransactionId(transactionId) {
        try {
            const result = await this.stripe.paymentIntents.capture(transactionId);
            return {
                status: true,
                message: 'Stripe payment captured successfully',
                data: result,
            };
        }
        catch (e) {
            throw new common_1.BadRequestException({
                status: false,
                message: (e === null || e === void 0 ? void 0 : e.message) || 'Payment not captured, please try again.',
                data: e.payment_intent,
            });
        }
    }
    async refundPayment(chargeId) {
        try {
            const result = await this.stripe.refunds.create({
                payment_intent: chargeId,
            });
            return {
                status: true,
                message: 'Refund completed.',
                data: result,
            };
        }
        catch (e) {
            return {
                status: false,
                message: (e === null || e === void 0 ? void 0 : e.message) || 'Refund not completed, please try again.',
                data: e === null || e === void 0 ? void 0 : e.payment_intent,
            };
        }
    }
    async getSavedCards(userId) {
        try {
            const customer = await this.stripeCustomerService.getCustomerByUserId(userId);
            const customerId = customer === null || customer === void 0 ? void 0 : customer.customerId;
            const paymentMethods = await this.stripe.paymentMethods.list({
                customer: customerId,
                type: 'card',
            });
            const cards = paymentMethods.data.map((paymentMethod) => {
                const { card } = paymentMethod;
                return {
                    id: paymentMethod.id,
                    brand: card.brand,
                    funding: card.funding,
                    last4: card.last4,
                    default: false,
                };
            });
            return {
                status: true,
                message: 'Saved cards.',
                data: cards,
            };
        }
        catch (e) {
            return {
                status: false,
                message: (e === null || e === void 0 ? void 0 : e.message) || 'Unable to retrieve saved cards.',
            };
        }
    }
};
StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        stripe_customer_service_1.StripeCustomerService])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map