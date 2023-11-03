import {
  Controller,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
  Req,
  Get,
  Param,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { GymService } from './gym.service';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GymProfileOwnerSuccessDto } from './dto/gym-profile-owner-response.dto';
import { GymProfileOwnerRequestDto } from './dto/gym-profile-owner-request.dto';
import { GymProfileBusinessSuccessDto } from './dto/gym-profile-business-response.dto';
import { GymProfileBusinessRequestDto } from './dto/gym-profile-business-request.dto';
import { GymProfileBusinessAddressSuccessDto } from './dto/gym-profile-business-address-response.dto';
import { GymProfileBusinessAddressRequestDto } from './dto/gym-profile-business-address-request.dto';
import { GymProfileCommunicationAddressSuccessDto } from './dto/gym-profile-communication-address-response.dto';
import { GymProfileCommunicationAddressRequestDto } from './dto/gym-profile-communication-address-request.dto';
import { GymProfileAboutBusinessSuccessDto } from './dto/gym-profile-about-business-response.dto';
import { GymProfileAboutBusinessRequestDto } from './dto/gym-profile-about-business-request.dto';
import { GymProfilePhotosSuccessDto } from './dto/gym-profile-photos-response.dto';
import { GymProfilePhotosRequestDto } from './dto/gym-profile-photos-request.dto';
import { GymProfileWaiverSuccessDto } from './dto/gym-profile-waiver-response.dto';
import { GymProfileWaiverRequestDto } from './dto/gym-profile-waiver-request.dto';
import { GymProfileCategoryUpdateSuccessDto } from './dto/gym-profile-category-response.dto';
import { GymProfileBusinessOperatingHoursSuccessDto } from './dto/gym-profile-business-opearting-hours-response.dto';
import { GymProfileBusinessOperatingHoursRequestDto } from './dto/gym-profile-business-opearting-hours-request.dto';
import { GymProfileAmenitySuccessDto } from './dto/gym-profile-amenity-response.dto';
import { GymProfileAmenityRequestDto } from './dto/gym-profile-amenity-request.dto';
import { GymStatus } from 'src/enums/gym-type-status.enum';
import { UserType } from 'src/enums/user-type.enum';
import {
  BaseBadRequestErrorReponse,
  BaseInternalServerErrorReponse,
  BaseNotFoundErrorReponse,
} from 'src/utils/base.response.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymDataModal, GymUpdateRequestDto } from './dto/gym-data.dto';
import {
  BasicGymDataResponseDto,
  UserGymDetailDataResponseDto,
} from './dto/basic-gym-data.dto';
import { GymProfileFinancialSuccessDto } from './dto/gym-profile-financial-details-response.dto';
import { GymProfileFinancialCreditCardRequestDto } from './dto/gym-profile-financial-credit-card-details-request.dto';
import { GymProfileFinancialAchDetailsRequestDto } from './dto/gym-profile-financial-ach-details-request.dto';
import { PaymentMode } from 'src/enums/gym-financial.enum';
import { GymProfileCategoryRequestDto } from './dto/gym-profile-category-request.dto';
import { StripeConnectOnboardingResponse } from './dto/stripe-onboarding.dto';

@ApiTags('Gyms')
@ApiBearerAuth()
@Controller('gyms')
@ApiNotFoundResponse({
  type: BaseNotFoundErrorReponse,
})
@ApiInternalServerErrorResponse({
  type: BaseInternalServerErrorReponse,
})
@ApiBadRequestResponse({
  type: BaseBadRequestErrorReponse,
})
export class GymController {
  constructor(private readonly gymService: GymService) {}
  @Get('/:id')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymDataModal,
  })
  async getGymDetailsbyId(@Req() req: Request, @Param('id') gymId: number) {
    const { userType } = req['user'];
    if (userType !== UserType.Gym) {
      throw new UnauthorizedException('Unauthorised access');
    }
    const res = await this.gymService.getGymById(gymId);

    return {
      status: true,
      message: 'gym fetched successfully.',
      data: res,
    };
  }

  @Get('/:id/for-users')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: UserGymDetailDataResponseDto,
  })
  async getGymDetailsbyIdForUser(
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { userType } = req['user'];
    if (userType !== UserType.User) {
      throw new UnauthorizedException('Unauthorised access');
    }
    const res = await this.gymService.getGymByIdForUser(gymId);

    return {
      status: true,
      message: 'gym fetched successfully.',
      data: res,
    };
  }

  @Get('/:id/basic')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: BasicGymDataResponseDto,
  })
  async getBasicGymDetailsbyId(
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const res = await this.gymService.getBasicGymDetailsById(gymId);
    return {
      status: true,
      message: 'gym fetched successfully.',
      data: res,
    };
  }

  @Patch('/:id/owner-profile')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileOwnerSuccessDto,
  })
  async saveGymOnboardingOwnerProfileBasic(
    @Body() gymModelData: GymProfileOwnerRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymOwnerProfileBasic(gymId, gymModelData, id);
  }

  @Patch('/:id/business-profile')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileBusinessSuccessDto,
  })
  async saveGymOnboardingBusinessProfileBasic(
    @Body() gymModelData: GymProfileBusinessRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymBusinessProfileBasic(
      gymId,
      gymModelData,
      id,
    );
  }

  @Patch('/:id/business-address')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileBusinessAddressSuccessDto,
  })
  async saveGymOnboardingBusinessAddressProfile(
    @Body() gymModelData: GymProfileBusinessAddressRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymBusinessAddressProfile(
      gymId,
      gymModelData,
      id,
    );
  }

  @Patch('/:id/communication-address')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileCommunicationAddressSuccessDto,
  })
  async saveGymOnboardingCommunicationAddressProfile(
    @Body() gymModelData: GymProfileCommunicationAddressRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymCommunicationAddressProfile(
      gymId,
      gymModelData,
      id,
    );
  }

  @Patch('/:id/about-business')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileAboutBusinessSuccessDto,
  })
  async saveGymOnboardingAboutAddressProfile(
    @Body() gymModelData: GymProfileAboutBusinessRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymAboutAddressProfile(
      gymId,
      gymModelData,
      id,
    );
  }

  @Patch('/:id/business-hours')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileBusinessOperatingHoursSuccessDto,
  })
  async saveGymOnboardingBusinessHoursProfile(
    @Body() gymModelData: GymProfileBusinessOperatingHoursRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    return this.gymService.updateGymBusinessHoursProfile(gymId, gymModelData);
  }

  @Patch('/:id/business-photo')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfilePhotosSuccessDto,
  })
  async saveGymOnboardingBusinessPhotosProfile(
    @Body() gymModelData: GymProfilePhotosRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymBusinessPhotosProfile(
      gymId,
      gymModelData,
      id,
    );
  }

  @Patch('/:id/business-waiver')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileWaiverSuccessDto,
  })
  async saveGymOnboardingUserWaiverProfile(
    @Body() gymModelData: GymProfileWaiverRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymUserWaiverProfile(gymId, gymModelData, id);
  }

  @Patch('/:id/fitness-category')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Gym User Profile Onboarding',
    type: GymProfileCategoryUpdateSuccessDto,
  })
  async updateUserOnboardingProfileCategory(
    @Req() req: Request,
    @Body() userModelData: GymProfileCategoryRequestDto,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymProfileCategory(gymId, userModelData, id);
  }

  @Patch('/:id/amenities')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: GymProfileAmenitySuccessDto,
  })
  async updateGymOnboardingUserAmenityProfile(
    @Body() gymModelData: GymProfileAmenityRequestDto,
    @Req() req: Request,
    @Param('id') gymId: number,
  ) {
    const { id } = req['user'];
    return this.gymService.updateGymUserAmenityProfile(gymId, gymModelData, id);
  }

  @Get('/:id/instructors')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async getGymInstructors(@Req() req: Request, @Param('id') gymId: number) {
    const { id } = req['user'];
    return this.gymService.getGymInstructors(gymId, id);
  }

  @Patch(':id/approve')
  async approveGym(@Param('id') gymId: number) {
    return this.gymService.updateGymStatus(gymId, GymStatus.Approved);
  }

  @Patch(':id/decline')
  async declineGym(@Param('id') gymId: number) {
    return this.gymService.updateGymStatus(gymId, GymStatus.Declined);
  }

  @Patch(':id/suspend')
  async suspendGym(@Param('id') gymId: number) {
    return this.gymService.updateGymStatus(gymId, GymStatus.Suspended);
  }

  @Patch('/:id')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async updateGymProfile(
    @Param('id') gymId: number,
    @Body() payload: GymUpdateRequestDto,
  ) {
    if (Object.keys(payload).length === 0) {
      throw new BadRequestException('Please provide the value to be updated!');
    }

    return await this.gymService.updateGymProfile(gymId, payload);
  }
  @ApiBearerAuth()
  @Patch(':id/financial/creditcard')
  @ApiOkResponse({
    type: GymProfileFinancialSuccessDto,
  })
  async financialCreditCardDetailsGym(
    @Req() req: Request,
    @Param('id') gymId: number,
    @Body()
    financialDetails: GymProfileFinancialCreditCardRequestDto,
  ) {
    return this.gymService.updateFinancialDetails(
      gymId,
      financialDetails,
      PaymentMode.CreditCard,
    );
  }

  @ApiBearerAuth()
  @Patch(':id/financial/ach')
  @ApiOkResponse({
    type: GymProfileFinancialSuccessDto,
  })
  async financialAchDetailsGym(
    @Req() req: Request,
    @Param('id') gymId: number,
    @Body()
    financialDetails: GymProfileFinancialAchDetailsRequestDto,
  ) {
    return this.gymService.updateFinancialDetails(
      gymId,
      financialDetails,
      PaymentMode.ACH,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  @Get(':id/reviews')
  async getReviews(@Param('id') gymId: string) {
    return this.gymService.getGymReviews(gymId);
  }

  @Get('/:id/connect-onboarding-url')
  @ApiOkResponse({
    type: StripeConnectOnboardingResponse,
  })
  async getconnecturl(@Param('id') gymId: number) {
    return await this.gymService.getStripeConnectUrl(gymId);
  }
}
