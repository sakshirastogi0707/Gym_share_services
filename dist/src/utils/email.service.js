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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async send(mail) {
        try {
            return await this.mailerService.sendMail(mail);
        }
        catch (e) {
            console.log('Send Email Error', e);
            throw new common_1.ForbiddenException({
                status: false,
                message: 'Email not sent, please try later.',
            });
        }
    }
    async sendInviteMail(receiverEmail, name) {
        const html = `<p>Hello ${name},</p> You've been invited to join Gripstudio. Please <a target="_blank" href="">click here</a> to download the app. <br><br> Cheers! <br> Gripstudio Team`;
        const msg = {
            to: receiverEmail,
            subject: `Invitation- Gripstudio`,
            html: html,
        };
        return this.send(msg);
    }
    async signupEmail(receiverEmail, name) {
        const msg = {
            to: receiverEmail,
            subject: 'Welcome to Gripstudio',
            template: 'test-email',
            context: {
                username: name,
            }
        };
        return this.send(msg);
    }
    async sendRejectionMail(receiverEmail, name) {
        const html = `<p>Hello ${name},</p> Your registration has been rejected. Please contact our sales representative.<br><br> Cheers! <br> Gripstudio Team`;
        const msg = {
            to: receiverEmail,
            subject: `Registration- Gripstudio`,
            html: html,
        };
        return this.send(msg);
    }
    async sendApprovalMail(receiverEmail, name) {
        const html = `<p>Hello ${name},</p> Your registration has been accepted.Please <a target="_blank" href="">click here</a> to download the app. <br><br> Cheers! <br> Gripstudio Team`;
        const msg = {
            to: receiverEmail,
            subject: `Registration- Gripstudio`,
            html: html,
        };
        return this.send(msg);
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map