import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadService } from './lead.service';

@ApiTags('Lead')
@ApiCreatedResponse()
@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({
    description: 'Data saved successfully',
  })
  create(@Body() lead: CreateLeadDto) {
    return this.leadService.createLead(lead);
  }
}
