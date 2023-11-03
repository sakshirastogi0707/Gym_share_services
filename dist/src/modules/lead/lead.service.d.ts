import { CreateLeadDto } from './dto/create-lead.dto';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
export declare class LeadService {
    private leadRepository;
    constructor(leadRepository: Repository<Lead>);
    createLead(lead: CreateLeadDto): Promise<{
        status: boolean;
        message: string;
    }>;
}
