import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class EmailService {

  constructor(private readonly mailerService: MailerService) {}

  async send(mail: any) {
    try {
      return await this.mailerService.sendMail(mail);
    } catch (e) {
      console.log('Send Email Error', e);
      throw new ForbiddenException({
        status: false,
        message: 'Email not sent, please try later.',
      });
    }
  }

  async sendInviteMail(receiverEmail, name) {
    const html = `<p>Hello ${name},</p> You've been invited to join Gripstudio. Please <a target="_blank" href="">click here</a> to download the app. <br><br> Cheers! <br> Gripstudio Team`;
    const msg = {
      // from: this.senderEmail,
      to: receiverEmail,
      subject: `Invitation- Gripstudio`,
      html: html,
    };

    return this.send(msg);
  }

  async signupEmail(receiverEmail, name) {
    const msg ={
      to:receiverEmail,
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
      // from: this.senderEmail,
      to: receiverEmail,
      subject: `Registration- Gripstudio`,
      html: html,
    };

    return this.send(msg);
  }

  async sendApprovalMail(receiverEmail, name) {
    const html = `<p>Hello ${name},</p> Your registration has been accepted.Please <a target="_blank" href="">click here</a> to download the app. <br><br> Cheers! <br> Gripstudio Team`;
    const msg = {
      // from: this.senderEmail,
      to: receiverEmail,
      subject: `Registration- Gripstudio`,
      html: html,
    };

    return this.send(msg);
  }
}
