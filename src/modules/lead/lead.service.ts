import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { LeadType } from 'src/enums/lead-type.enum';
@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async createLead(lead: CreateLeadDto) {
    try {
      const createdLeadData = this.leadRepository.create(lead);

      if (
        createdLeadData.leadType === LeadType.GYM ||
        createdLeadData.leadType === LeadType.USER
      ) {
        await this.leadRepository.save(createdLeadData);
      }

      return {
        status: true,
        message: 'Lead created successfully',
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException({
          status: false,
          message: 'Data already exists!',
        });
      } else {
        throw new InternalServerErrorException({
          status: false,
          message: error?.message || 'Unable to create lead, please try again.',
        });
      }
    }
  }
}
