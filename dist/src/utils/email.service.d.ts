import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    send(mail: any): Promise<SentMessageInfo>;
    sendInviteMail(receiverEmail: any, name: any): Promise<SentMessageInfo>;
    signupEmail(receiverEmail: any, name: any): Promise<SentMessageInfo>;
    sendRejectionMail(receiverEmail: any, name: any): Promise<SentMessageInfo>;
    sendApprovalMail(receiverEmail: any, name: any): Promise<SentMessageInfo>;
}
