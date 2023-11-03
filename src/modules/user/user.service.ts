import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

import {
  CreateEarlyUserSignupRequestDto,
  UpdateUserNameLocationRequestDto,
  UpdateUserProfileCategoryRequestDto,
  UpdateUserSignupRequestDto,
} from './dto/user.dto';
import { ExperienceLevel } from 'src/enums/experience-level.enum';
import { UserCategorySubCategory } from './entity/user.category.subcategory.entity';
import { StepName } from 'src/enums/step-name.enum';
import { UpdateUserProfileBasicRequestDto } from './dto/update-user-profile-basic-request.dto';
import { UpdateUserProfilePicRequestDto } from './dto/update-user-profile-pic-request.dto';
import { UpdateUserProfileFitnessLevelRequestDto } from './dto/update-user-profile-fitness-level-request.dto';
import { UpdateUserProfileMedicalHistoryRequestDto } from './dto/update-user-profile-medical-history-request.dto';
import { UpdateUserProfileDocumentRequestDto } from './dto/update-user-profile-document-request.dto';
import { Gym } from '../gym/entities/gym.entity';
import { UserType } from 'src/enums/user-type.enum';
import { GymStatus } from 'src/enums/gym-type-status.enum';
import { transformUserData } from 'src/utils/transformUserData.utils';
import { UserStatus } from 'src/enums/user-type-status.enum';
import { SourceType } from 'src/enums/source-type.enum';
import { EmailService } from 'src/utils/email.service';
import { admin } from 'src/utils/firebase.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
    @InjectRepository(UserCategorySubCategory)
    private userCategorySubCategoryRepository: Repository<UserCategorySubCategory>,
    private emailService: EmailService,
  ) {}

  async createUser(user: UpdateUserSignupRequestDto, firebase_uuid: string) {
    const existingEmailUser = await this.userRepository.findOne({
      where: [{ emailId: user.emailId, firebaseUuid: firebase_uuid }],
    });
    if (existingEmailUser) {
      if ([UserStatus.Pending].includes(existingEmailUser.userStatus)) {
        throw new UnauthorizedException(
          `Your account is pending for approval . Please contact our sales representative.`,
        );
      }

      if (existingEmailUser.userStatus !== UserStatus.Unverified) {
        throw new ConflictException('Email already exists');
      }
    }

    const userEntity = existingEmailUser
      ? existingEmailUser
      : this.userRepository.create({
          ...user,
          firebaseUuid: firebase_uuid,
          userStatus: UserStatus.Approved,
        });
    userEntity.userStatus = UserStatus.Approved;
    userEntity.phoneNumber = user.phoneNumber;
    const createdUser = await this.userRepository.save(userEntity);
    if (!createdUser) {
      throw new NotFoundException('Failed to create user');
    }

    if (createdUser.userType === UserType.Gym) {
      const gymEntity = this.gymRepository.create({
        user: createdUser,
        status: GymStatus.Approved,
      });

      const createdGym = await this.gymRepository.save(gymEntity);
      createdUser['GymId'] = createdGym.id;
    }

    return {
      ...createdUser,
      userType: UserType[createdUser.userType],
      userStatus: UserStatus[createdUser.userStatus],
    };
  }

  async getUserProfile(user: any) {
    const userData = await this.userRepository.findOne({
      where: [{ id: user.id }],
      relations: [
        'userCategorySubcategories',
        'userCategorySubcategories.category',
        'userCategorySubcategories.subcategory',
      ],
    });
    const transformedData = await transformUserData(userData);

    return {
      status: true,
      message: 'Guest user profile details',
      data: transformedData,
    };
  }

  async getUser(firebase_uuid: string, email_id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: [
          { firebaseUuid: firebase_uuid, emailId: email_id, isActive: true },
        ],
        relations: ['gyms'],
      });
      if (!user || user == undefined) throw new NotFoundException();

      return user;
    } catch (error) {
      if (error.response.statusCode === HttpStatus.NOT_FOUND)
        throw new NotFoundException('User not found!');
      throw new InternalServerErrorException('Server Error!');
    }
  }

  async getUserByFirebaseId(firebase_uuid: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ firebaseUuid: firebase_uuid }],
      });
      if (!user || user == undefined) throw new NotFoundException();

      return user;
    } catch (error) {
      if (error.response.statusCode === HttpStatus.NOT_FOUND)
        throw new NotFoundException('User not found!');
      throw new InternalServerErrorException('Server Error!');
    }
  }

  async deleteUser(users: any) {
    const { id } = users;
    const user = await this.userRepository.findOne({
      where: [{ id: id, isActive: true }],
    });

    user.isActive = false;
    user.deletedAt = new Date();
    await user.save();
    if (user.userType === UserType.Gym) {
      const gym = await this.gymRepository.findOne({ user: id });
      gym.status = GymStatus.Deactivated;
      gym.save();
    }
    return { status: true, message: 'User soft deleted successfully!' };
  }

  async updateUserProfileBasic(
    userProfileData: UpdateUserProfileBasicRequestDto,
    firebase_uuid: any,
  ): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ firebaseUuid: firebase_uuid, isActive: true }],
    });

    if (!user) {
      throw new NotFoundException({
        status: false,
        message: 'User not found',
      });
    }

    const response = await this.userRepository.update(
      { firebaseUuid: String(firebase_uuid) },
      {
        stepName:
          user.userStatus === UserStatus.Onboarded
            ? user.stepName
            : StepName.FULLNAME,
        emailId: userProfileData.emailId,
        fullName: userProfileData.fullName,
        birthDate: userProfileData.birthDate,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update profile',
      });
    }

    const updatedUser = await this.userRepository.findOne({
      firebaseUuid: String(firebase_uuid),
    });

    return {
      status: true,
      message: 'Profile updated successfully',
      stepName: updatedUser.stepName,
      data: {
        fullName: updatedUser.fullName,
        emailId: updatedUser.emailId,
        birthDate: updatedUser.birthDate,
      },
    };
  }

  async updateUserProfilePic(
    userProfileData: UpdateUserProfilePicRequestDto,
    firebase_uuid: any,
  ): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ firebaseUuid: firebase_uuid, isActive: true }],
    });

    if (!user) {
      throw new NotFoundException({
        status: false,
        message: 'User not found',
      });
    }

    const response = await this.userRepository.update(
      { firebaseUuid: String(firebase_uuid) },
      {
        stepName:
          user.userStatus === UserStatus.Onboarded
            ? user.stepName
            : StepName.PROFILE,
        profilePic: userProfileData.profilePic,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update profile',
      });
    }

    const updatedUser = await this.userRepository.findOne({
      firebaseUuid: String(firebase_uuid),
    });

    return {
      status: true,
      message: 'Profile updated successfully',
      stepName: updatedUser.stepName,
      data: {
        profilePic: updatedUser.profilePic,
      },
    };
  }

  async updateUserProfileFitnessLevel(
    userProfileData: UpdateUserProfileFitnessLevelRequestDto,
    firebase_uuid: any,
  ) {
    const user = await this.userRepository.findOne({
      where: [{ firebaseUuid: firebase_uuid, isActive: true }],
    });

    if (!user) {
      throw new NotFoundException({
        status: false,
        message: 'User not found',
      });
    }

    if (
      userProfileData.experienceLevel &&
      Object.values(ExperienceLevel).some(
        (level) => level.toString() === userProfileData.experienceLevel,
      )
    ) {
      user.experienceLevel =
        userProfileData.experienceLevel as keyof typeof ExperienceLevel;
      user.stepName = StepName.EXPERIENCE;
    } else {
      throw new BadRequestException('Invalid experience level');
    }

    const response = await this.userRepository.update(
      { firebaseUuid: String(firebase_uuid) },
      {
        stepName:
          user.userStatus === UserStatus.Onboarded
            ? user.stepName
            : StepName.EXPERIENCE,
        experienceLevel: userProfileData.experienceLevel,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update profile',
      });
    }

    const updatedUser = await this.userRepository.findOne({
      firebaseUuid: String(firebase_uuid),
    });

    return {
      status: true,
      message: 'Profile updated successfully',
      stepName: updatedUser.stepName,
      data: {
        experienceLevel: updatedUser.experienceLevel,
      },
    };
  }
  async updateUserProfileMedicalHistory(
    userProfileData: UpdateUserProfileMedicalHistoryRequestDto,
    firebase_uuid: any,
  ) {
    const user = await this.userRepository.findOne({
      where: [{ firebaseUuid: firebase_uuid, isActive: true }],
    });

    if (!user) {
      throw new NotFoundException({
        status: false,
        message: 'User not found',
      });
    }

    const response = await this.userRepository.update(
      { firebaseUuid: String(firebase_uuid) },
      {
        stepName:
          user.userStatus === UserStatus.Onboarded
            ? user.stepName
            : StepName.HISTORY,
        medicalHistory: userProfileData.medicalHistory,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update profile',
      });
    }

    const updatedUser = await this.userRepository.findOne({
      firebaseUuid: String(firebase_uuid),
    });

    return {
      status: true,
      message: 'Profile updated successfully',
      stepName: updatedUser.stepName,
      data: {
        medicalHistory: updatedUser.medicalHistory,
      },
    };
  }

  async updateUserProfileCategory(
    userProfileData: UpdateUserProfileCategoryRequestDto,
    firebase_uuid: any,
  ): Promise<any> {
    const updatedUser = await this.userRepository.findOne({
      where: [{ firebaseUuid: firebase_uuid, isActive: true }],
    });

    if (!updatedUser) {
      throw new NotFoundException({
        status: false,
        message: 'User not found',
      });
    }
    const userCategorySubCategories = [];
    for (const category of userProfileData.categoryData) {
      if (category.subCategoryIds && category.subCategoryIds.length > 0) {
        for (const subCategoryId of category.subCategoryIds) {
          const userCategorySubCategory = new UserCategorySubCategory();
          userCategorySubCategory.userId = Number(updatedUser.id);
          userCategorySubCategory.categoryId = category.categoryId;
          userCategorySubCategory.subCategoryId = subCategoryId;
          userCategorySubCategories.push(userCategorySubCategory);
        }
      } else {
        const userCategorySubCategory = new UserCategorySubCategory();
        userCategorySubCategory.userId = Number(updatedUser.id);
        userCategorySubCategory.categoryId = category.categoryId;
        userCategorySubCategories.push(userCategorySubCategory);
      }
    }
    await this.userCategorySubCategoryRepository.delete({
      userId: parseInt(`${updatedUser.id}`),
    });
    await this.userCategorySubCategoryRepository
      .insert(userCategorySubCategories)
      .catch((err) => {
        if (err.constraint == 'user_category_subcategory_unique_constraint') {
          throw new BadRequestException(err.message);
        }
      });

    updatedUser.stepName =
      updatedUser.userStatus === UserStatus.Onboarded
        ? updatedUser.stepName
        : StepName.CATEGORY;
    await updatedUser.save();
    return {
      status: true,
      message: 'Profile updated successfully',
      stepName: updatedUser.stepName,
      data: userProfileData,
    };
  }

  async updateUserProfileDocument(
    userProfileData: UpdateUserProfileDocumentRequestDto,
    firebase_uuid: any,
  ): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ firebaseUuid: firebase_uuid, isActive: true }],
    });

    if (!user) {
      throw new NotFoundException({
        status: false,
        message: 'User not found',
      });
    }

    const response = await this.userRepository.update(
      { firebaseUuid: String(firebase_uuid) },
      {
        stepName:
          user.userStatus === UserStatus.Onboarded
            ? user.stepName
            : StepName.CERTIFICATION,
        documentCertificate: userProfileData.documentCertificate,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update profile',
      });
    }

    const updatedUser = await this.userRepository.findOne({
      firebaseUuid: String(firebase_uuid),
    });

    return {
      status: true,
      message: 'Profile updated successfully',
      stepName: updatedUser.stepName,
      data: {
        documentCertificate: updatedUser.documentCertificate,
      },
    };
  }
  async updateUserNameLocation(
    userProfileData: UpdateUserNameLocationRequestDto,
    firebase_uuid: any,
  ) {
    const user = await this.userRepository.findOne({
      where: [{ firebaseUuid: firebase_uuid }],
    });

    if (!user) {
      throw new NotFoundException({
        status: false,
        message: 'User not found',
      });
    }
    try {
      await this.userRepository.update(
        { firebaseUuid: String(firebase_uuid) },
        {
          fullName: userProfileData.fullName,
          location: userProfileData.location,
        },
      );

      return {
        status: true,
        message: 'Profile updated successfully',
        data: userProfileData,
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async createEarlyUser(
    user: CreateEarlyUserSignupRequestDto,
    firebase_uuid: string,
    userStatus: number,
    source: number,
  ) {
    try {
      const existingEarlyUserEmail = await this.userRepository.findOne({
        where: [{ emailId: user.emailId, firebaseUuid: firebase_uuid }],
      });

      // if (existingEarlyUserEmail) {
      //   throw new ConflictException('Email already exists');
      // }

      // const userEntity = this.userRepository.create(user);

      // userEntity.source = SourceType[source];
      // userEntity.userStatus = userStatus;
      // userEntity.firebaseUuid = firebase_uuid;
      // const createdEarlyUser = await this.userRepository.save(userEntity);

      // if (!createdEarlyUser) {
      //   throw new BadRequestException('Failed to create user');
      // }

      // if (createdEarlyUser.userType === UserType.Gym) {
      //   const gymEntity = this.gymRepository.create({
      //     user: createdEarlyUser,
      //     status: GymStatus.Pending,
      //   });

      //   const createdGym = await this.gymRepository.save(gymEntity);
      //   createdEarlyUser['GymId'] = createdGym.id;
      // }
      this.emailService.signupEmail('sakshi.rastogi@simubladetechnology.com', user.fullName);
      return {
        // ...createdEarlyUser,
        // userStatus: UserStatus[createdEarlyUser.userStatus],
        // userType: UserType[createdEarlyUser.userType],
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async checkDuplicateNumber(number: string) {
    try {
      const user = await admin.auth().getUserByPhoneNumber(number);

      if (user) {
        throw new ConflictException('Number already exists!');
      }
    } catch (err) {
      if (err.code === 'auth/invalid-phone-number') {
        throw new BadRequestException('Please provide a valid phone number');
      }
      if (err.code === 'auth/user-not-found') {
        return {
          status: 200,
          message: 'Number doest not exist.',
        };
      }
      if (err instanceof ConflictException) {
        throw err;
      }
      throw new InternalServerErrorException(err.message);
    }
  }
}
