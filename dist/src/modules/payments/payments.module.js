"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_middleware_1 = require("../../middlewares/user.middleware");
const payments_entity_1 = require("./entity/payments.entity");
const payments_controller_1 = require("./payments.controller");
const payments_service_1 = require("./payments.service");
const stripe_customer_entity_1 = require("./entity/stripe-customer.entity");
const stripe_service_1 = require("./stripe.service");
const stripe_customer_service_1 = require("./stripe-customer.service");
const email_service_1 = require("../../utils/email.service");
const user_module_1 = require("../user/user.module");
let PaymentsModule = class PaymentsModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.UserAuthMiddleware).forRoutes(payments_controller_1.PaymentsController);
        consumer.apply(user_middleware_1.UserMiddleware).forRoutes(payments_controller_1.PaymentsController);
    }
};
PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payments_entity_1.Payment, stripe_customer_entity_1.StripeCustomer]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [payments_controller_1.PaymentsController],
        providers: [
            payments_service_1.PaymentsService,
            stripe_service_1.StripeService,
            stripe_customer_service_1.StripeCustomerService,
            email_service_1.EmailService,
        ],
        exports: [stripe_service_1.StripeService, payments_service_1.PaymentsService, stripe_customer_service_1.StripeCustomerService],
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payments.module.js.map