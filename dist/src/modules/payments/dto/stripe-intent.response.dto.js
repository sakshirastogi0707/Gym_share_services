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
exports.StripeIntentSuccessDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
const stripe_1 = require("stripe");
class StripeIntentResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stripe payment intent',
        example: {
            id: 'pi_1Dt1sb2eZvKYlo2CEaM1ZUhw',
            object: 'payment_intent',
            amount: 2000,
            amount_capturable: 0,
            amount_details: {
                tip: {},
            },
            amount_received: 0,
            application: null,
            application_fee_amount: null,
            automatic_payment_methods: {
                enabled: true,
            },
            canceled_at: null,
            cancellation_reason: null,
            capture_method: 'automatic',
            client_secret: 'pi_1Dt1sb2eZvKYlo2CEaM1ZUhw_secret_0tJithEDKGo9KT8SqXuQyPsnO',
            confirmation_method: 'automatic',
            created: 1547597017,
            currency: 'usd',
            customer: null,
            description: null,
            invoice: null,
            last_payment_error: null,
            latest_charge: null,
            livemode: false,
            metadata: {},
            next_action: null,
            on_behalf_of: null,
            payment_method: null,
            payment_method_options: {},
            payment_method_types: ['card'],
            processing: null,
            receipt_email: null,
            redaction: null,
            review: null,
            setup_future_usage: null,
            shipping: null,
            statement_descriptor: null,
            statement_descriptor_suffix: null,
            status: 'requires_payment_method',
            transfer_data: null,
            transfer_group: null,
        },
    }),
    __metadata("design:type", Object)
], StripeIntentResponseDto.prototype, "paymentIntent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stripe customer id',
        example: 'cus_xraq79adf',
    }),
    __metadata("design:type", String)
], StripeIntentResponseDto.prototype, "customerId", void 0);
class StripeIntentSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => StripeIntentResponseDto }),
    __metadata("design:type", Object)
], StripeIntentSuccessDto.prototype, "data", void 0);
exports.StripeIntentSuccessDto = StripeIntentSuccessDto;
//# sourceMappingURL=stripe-intent.response.dto.js.map