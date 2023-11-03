import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  Get,
  Patch,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  GetUserViewResponseSuccessDto,
  InviteUserRequestDto,
} from './dto/invite-user.dto';
import { Request, Response } from 'express';
import { SourceType } from 'src/enums/source-type.enum';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { UserStatus } from 'src/enums/user-type-status.enum';
import { ResendEmailDto } from './dto/resend-email.dto';
import { EmailTemplate } from 'src/enums/email-template.enum';
import { EmailService } from 'src/utils/email.service';

@ApiTags('Admin')
@ApiBearerAuth()
@ApiCreatedResponse()
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private emailService: EmailService,
  ) {}

  @Post('/invite')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({
    type: BaseResponseDto,
  })
  async invite(@Req() req: Request, @Body() user: InviteUserRequestDto) {
    return await this.adminService.inviteUser(user, SourceType.Invited);
  }

  @Patch('/:id/approve')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({
    type: BaseResponseDto,
  })
  async approve(@Param('id') userId: number) {
    return await this.adminService.updateUserStatusByAdmin(
      userId,
      UserStatus.Unverified,
    );
  }

  @Patch('/:id/decline')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({
    type: BaseResponseDto,
  })
  async decline(@Param('id') userId: number) {
    return await this.adminService.updateUserStatusByAdmin(
      userId,
      UserStatus.Declined,
    );
  }

  @Get('/users-waitlist')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({
    type: GetUserViewResponseSuccessDto,
  })
  async getDetailsAdminUserWaitlist() {
    return await this.adminService.getAdminUserWaitlistDetails();
  }

  @Get('/validate')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async validateAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authToken = req.headers.authorization;
    res.cookie('authorization', authToken, { maxAge: 3600, httpOnly: true });
    res.cookie('isAuthenticated', true, { maxAge: 3600 });
    res.send({ status: 200, message: 'Admin validated successfully' });
  }

  @Post('/resend-email')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async resendEmail(@Body() payload: ResendEmailDto) {
    try {
      switch (payload.template) {
        case EmailTemplate.INVITE:
          await this.emailService.sendInviteMail(payload.emailId, payload.name);
      }
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
