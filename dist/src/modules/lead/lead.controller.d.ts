import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadService } from './lead.service';
export declare class LeadController {
    private readonly leadService;
    constructor(leadService: LeadService);
    create(lead: CreateLeadDto): Promise<{
        status: boolean;
        message: string;
    }>;
}
