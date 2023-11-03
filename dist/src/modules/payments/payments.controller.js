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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payments_service_1 = require("./payments.service");
const get_stripe_publishable_key_response_dto_1 = require("./dto/get-stripe-publishable-key.response.dto");
const stripe_intent_response_dto_1 = require("./dto/stripe-intent.response.dto");
const stripe_service_1 = require("./stripe.service");
const stripe_intent_request_dto_1 = require("./dto/stripe-intent.request.dto");
const base_response_dto_1 = require("../../utils/base.response.dto");
const payment_request_dto_1 = require("./dto/payment.request.dto");
const saved_cards_dto_1 = require("./dto/saved-cards.dto");
let PaymentsController = class PaymentsController {
    constructor(paymentService, stripeService) {
        this.paymentService = paymentService;
        this.stripeService = stripeService;
    }
    getPublishableKey() {
        return this.paymentService.getPublishableKey();
    }
    createStripeIntent(body, req) {
        const user = req['user'];
        return this.stripeService.createStripeIntent(body, user);
    }
    refundPayment(body) {
        return this.stripeService.refundPayment(body.transactionId);
    }
    async getSavedCards(req) {
        const user = req['user'];
        return this.stripeService.getSavedCards(user.id);
    }
};
__decorate([
    (0, common_1.Get)('publishable-key'),
    (0, swagger_1.ApiOkResponse)({
        type: get_stripe_publishable_key_response_dto_1.GetStripePublishableKeySuccessDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getPublishableKey", null);
__decorate([
    (0, common_1.Post)('stripe-intent'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiOkResponse)({
        type: stripe_intent_response_dto_1.StripeIntentSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stripe_intent_request_dto_1.StripeIntentRequestDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createStripeIntent", null);
__decorate([
    (0, common_1.Post)('refund-payment'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_request_dto_1.RefundPaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "refundPayment", null);
__decorate([
    (0, common_1.Get)('/saved-cards'),
    (0, swagger_1.ApiOkResponse)({
        type: saved_cards_dto_1.GetSavedCardsSuccessDTO,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getSavedCards", null);
PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        stripe_service_1.StripeService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map