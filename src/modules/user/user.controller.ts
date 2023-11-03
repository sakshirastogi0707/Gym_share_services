import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateEarlyUserSignupRequestDto,
  MobileNumberDto,
  UpdateUserNameLocationRequestDto,
  UpdateUserProfileCategoryRequestDto,
  UpdateUserSignupRequestDto,
  UpdateUserSignupSuccessDto,
  UserDataModal,
  UserNameLocationUpdateSuccessDto,
} from './dto/user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UserProfileBasicUpdateSuccessDto } from './dto/update-user-profile-basic-response.dto';
import { UpdateUserProfileBasicRequestDto } from './dto/update-user-profile-basic-request.dto';
import { UserProfilePicUpdateSuccessDto } from './dto/update-user-profile-pic-response.dto';
import { UpdateUserProfilePicRequestDto } from './dto/update-user-profile-pic-request.dto';
import { UserProfileFitnessLevelUpdateSuccessDto } from './dto/update-user-profile-fitness-level-response.dto';
import { UpdateUserProfileFitnessLevelRequestDto } from './dto/update-user-profile-fitness-level-request.dto';
import { UpdateUserProfileMedicalHistoryRequestDto } from './dto/update-user-profile-medical-history-request.dto';
import { UserProfileMedicalHistoryUpdateSuccessDto } from './dto/update-user-profile-medical-history-response.dto';
import { UserProfileDocumentUpdateSuccessDto } from './dto/update-user-profile-document-response.dto';
import { UpdateUserProfileDocumentRequestDto } from './dto/update-user-profile-document-request.dto';
import { UserProfileCategoryUpdateSuccessDto } from './dto/update-user-profile-category-response.dto';
import { GymService } from '../gym/gym.service';
import { UserType } from 'src/enums/user-type.enum';
import {
  BaseNotFoundErrorReponse,
  BaseInternalServerErrorReponse,
} from 'src/utils/base.response.dto';
import {
  AccountSettings,
  GetAccountSettings,
} from '../shared/dtos/account-settings.dto';
import { AccountSettingsService } from '../shared/account-settings.service';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymDataModal } from '../gym/dto/gym-data.dto';
import { UserStatus } from 'src/enums/user-type-status.enum';
import { SourceType } from 'src/enums/source-type.enum';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
@ApiBearerAuth()
@ApiNotFoundResponse({
  type: BaseNotFoundErrorReponse,
})
@ApiInternalServerErrorResponse({
  type: BaseInternalServerErrorReponse,
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly gymService: GymService,
    private readonly accountService: AccountSettingsService,
  ) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({
    type: UpdateUserSignupSuccessDto,
  })
  @ApiCreatedResponse({
    type: UpdateUserSignupSuccessDto,
  })
  async signUp(@Body() user: UpdateUserSignupRequestDto, @Req() req: any) {
    const firebase_uuid = req['firebase_uuid'];
    user['firebaseUuid'] = firebase_uuid;
    const email_id = req['email_id'];
    user.emailId = email_id;
    const phone_number = req['phone_number'];
    user['phoneNumber'] = phone_number ? phone_number : user['phoneNumber'];
    if (user.emailId && user['phoneNumber'] && user['firebaseUuid']) {
      const createdUser = await this.userService.createUser(
        user,
        firebase_uuid,
      );

      return {
        success: true,
        message: 'User created successfully',
        data: createdUser,
      };
    } else {
      throw new BadRequestException({
        status: false,
        message: 'Invalid user input!',
      });
    }
  }

  @Post('/early-signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({
    type: BaseResponseDto,
  })
  async signUpEarlyUser(
    @Body() user: CreateEarlyUserSignupRequestDto,
    @Req() req: any,
  ) {
    try {
      const email_id = req['email_id'];
      if (email_id && user['phoneNumber'] && req['firebase_uuid']) {
        await this.userService.createEarlyUser(
          user,
          req['firebase_uuid'],
          UserStatus.Pending,
          SourceType.Self,
        );

        return {
          success: true,
          message: 'User registration successfully',
        };
      } else {
        throw new BadRequestException({
          status: false,
          message: 'Invalid user input!',
        });
      }
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/profile')
  @ApiOkResponse({
    description: 'Response for user details',
    type: UserDataModal,
  })
  @ApiOkResponse({
    description: 'Response for gym details',
    type: GymDataModal,
  })
  async userProfile(@Req() req: Request): Promise<any> {
    try {
      const user = req['user'];
      const userType = user['userType'];

      switch (userType) {
        case UserType.User:
          return this.userService.getUserProfile(user);
        case UserType.Gym:
          return this.gymService.getGymProfile(user);
        case UserType.Trainer:
        default:
          throw new BadRequestException('Invalid user type');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: false,
          message: 'User or gym not found',
          data: null,
        };
      } else if (error instanceof BadRequestException) {
        return {
          status: false,
          message: error.message,
          data: null,
        };
      } else {
        throw error;
      }
    }
  }

  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @Delete(':id')
  async deleteUser(@Req() req: Request): Promise<any> {
    const user = req['user'];
    try {
      const result = await this.userService.deleteUser(user);
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('User is already deleted');
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Patch('/profile-basic')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: UserProfileBasicUpdateSuccessDto,
  })
  async updateUserOnboardingProfileBasic(
    @Body() userModelData: UpdateUserProfileBasicRequestDto,
    @Req() req: Request,
  ) {
    const firebase_uuid = req['firebase_uuid'];
    return this.userService.updateUserProfileBasic(
      userModelData,
      String(firebase_uuid),
    );
  }

  @Patch('/profile-pic')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: UserProfilePicUpdateSuccessDto,
  })
  async updateUserOnboardingProfilePic(
    @Body() userModelData: UpdateUserProfilePicRequestDto,
    @Req() req: Request,
  ) {
    const firebase_uuid = req['firebase_uuid'];
    return this.userService.updateUserProfilePic(
      userModelData,
      String(firebase_uuid),
    );
  }

  @Patch('/profile-fitness-level')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: UserProfileFitnessLevelUpdateSuccessDto,
  })
  async updateUserOnboardingProfileFitnessLevel(
    @Body() userModelData: UpdateUserProfileFitnessLevelRequestDto,
    @Req() req: Request,
  ) {
    const firebase_uuid = req['firebase_uuid'];
    return this.userService.updateUserProfileFitnessLevel(
      userModelData,
      String(firebase_uuid),
    );
  }

  @Patch('/profile-medical-history')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: UserProfileMedicalHistoryUpdateSuccessDto,
  })
  async updateUserOnboardingProfileMedicalHistory(
    @Body() userModelData: UpdateUserProfileMedicalHistoryRequestDto,
    @Req() req: Request,
  ) {
    const firebase_uuid = req['firebase_uuid'];
    return this.userService.updateUserProfileMedicalHistory(
      userModelData,
      String(firebase_uuid),
    );
  }

  @Patch('/profile-category')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'User Profile Onboarding',
    type: UserProfileCategoryUpdateSuccessDto,
  })
  async updateUserOnboardingProfileCategory(
    @Body() userModelData: UpdateUserProfileCategoryRequestDto,
    @Req() req: Request,
  ) {
    const firebase_uuid = req['firebase_uuid'];
    return this.userService.updateUserProfileCategory(
      userModelData,
      String(firebase_uuid),
    );
  }

  @Patch('/profile-document')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: UserProfileDocumentUpdateSuccessDto,
  })
  async updateUserOnboardingProfileDocument(
    @Body() userModelData: UpdateUserProfileDocumentRequestDto,
    @Req() req: Request,
  ) {
    const firebase_uuid = req['firebase_uuid'];
    return this.userService.updateUserProfileDocument(
      userModelData,
      String(firebase_uuid),
    );
  }

  @Patch('/edit/basic-details')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: UserNameLocationUpdateSuccessDto,
  })
  async updateUserNameLocation(
    @Body() payload: UpdateUserNameLocationRequestDto,
    @Req() req: Request,
  ) {
    const firebase_uuid = req['firebase_uuid'];
    return this.userService.updateUserNameLocation(
      payload,
      String(firebase_uuid),
    );
  }
  @Patch('/account-settings')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async updateAccountSettings(
    @Body() payload: AccountSettings,
    @Req() req: Request,
  ) {
    await this.accountService.updateAccountSettings(req['user']['id'], payload);
    return {
      status: 200,
      message: 'Settings updated successfully',
    };
  }

  @Get('/account-settings')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    type: GetAccountSettings,
  })
  async getAccountSettings(@Req() req: Request) {
    const data = await this.accountService.getAccountSettings(req['user']);
    return {
      status: 200,
      message: 'Settings fetched successfully',
      data,
    };
  }

  @Post('/check-duplicate-mobile')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async checkDuplicateNumber(@Body() body: MobileNumberDto) {
    return await this.userService.checkDuplicateNumber(body['number']);
  }
}
