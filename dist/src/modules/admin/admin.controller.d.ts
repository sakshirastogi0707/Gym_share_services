import { AdminService } from './admin.service';
import { InviteUserRequestDto } from './dto/invite-user.dto';
import { Request, Response } from 'express';
import { ResendEmailDto } from './dto/resend-email.dto';
import { EmailService } from 'src/utils/email.service';
export declare class AdminController {
    private readonly adminService;
    private emailService;
    constructor(adminService: AdminService, emailService: EmailService);
    invite(req: Request, user: InviteUserRequestDto): Promise<{
        status: boolean;
        message: string;
    }>;
    approve(userId: number): Promise<{
        status: boolean;
        message: string;
    }>;
    decline(userId: number): Promise<{
        status: boolean;
        message: string;
    }>;
    getDetailsAdminUserWaitlist(): Promise<{
        status: boolean;
        message: string;
        data: any[];
    }>;
    validateAdmin(req: Request, res: Response): Promise<void>;
    resendEmail(payload: ResendEmailDto): Promise<void>;
}
