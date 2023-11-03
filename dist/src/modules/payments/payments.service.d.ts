import { ConfigService } from '@nestjs/config';
export declare class PaymentsService {
    private readonly configService;
    constructor(configService: ConfigService);
    getPublishableKey(): Promise<{
        status: boolean;
        message: string;
        data: string;
    }>;
}
