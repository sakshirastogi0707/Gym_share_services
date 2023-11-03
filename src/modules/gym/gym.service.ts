import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GymProfileOwnerRequestDto } from './dto/gym-profile-owner-request.dto';
import { Gym } from './entities/gym.entity';
import { GymStepName } from 'src/enums/gym-step-name.enum';
import { GymProfileBusinessRequestDto } from './dto/gym-profile-business-request.dto';
import {
  GymType,
  getGymBusinessCategoryText,
} from 'src/enums/gym-profile.enum';
import { GymProfileBusinessAddressRequestDto } from './dto/gym-profile-business-address-request.dto';
import { GymProfileCommunicationAddressRequestDto } from './dto/gym-profile-communication-address-request.dto';
import { GymProfileAboutBusinessRequestDto } from './dto/gym-profile-about-business-request.dto';
import { GymProfilePhotosRequestDto } from './dto/gym-profile-photos-request.dto';
import { GymProfileWaiverRequestDto } from './dto/gym-profile-waiver-request.dto';
import { GymProfileCategoryRequestDto } from './dto/gym-profile-category-request.dto';
import {
  GBHRequest,
  GymProfileBusinessOperatingHoursRequestDto,
} from './dto/gym-profile-business-opearting-hours-request.dto';
import { Business_Hour } from './entities/business_hour.entity';
import { UserType } from 'src/enums/user-type.enum';
import { GymCategorySubCategory } from './entities/gym.category.subcategory.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Amenity } from './entities/amenity.entity';
import { GymProfileAmenityRequestDto } from './dto/gym-profile-amenity-request.dto';
import { GymStatus } from 'src/enums/gym-type-status.enum';
import { GymUpdateRequestDto } from './dto/gym-data.dto';
import { GymProfileFinancialCreditCardRequestDto } from './dto/gym-profile-financial-credit-card-details-request.dto';
import { PaymentMode } from 'src/enums/gym-financial.enum';
import { FinancialDetails } from './dto/financial-details.interface';
import { ClassStatus } from 'src/enums/class.enum';
import { Class } from '../class/entities/class.entity';
import { getRepository } from 'typeorm';
import { getGoogleReviews } from 'src/utils/services';
import { serializeCategories } from 'src/utils/transformUserData.utils';
import { InstructorTrainedFor } from '../instructor/entities/trained_for.entity';
import { StripeService } from '../payments/stripe.service';
@Injectable()
export class GymService {
  constructor(
    @InjectRepository(GymCategorySubCategory)
    private gymCategorySubCategoryRepository: Repository<GymCategorySubCategory>,
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
    @InjectRepository(Business_Hour)
    private businessHoursRepository: Repository<Business_Hour>,
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(InstructorTrainedFor)
    private trainedForRepository: Repository<InstructorTrainedFor>,
    private stripeService: StripeService,
  ) {}

  async getGymProfile(user: any): Promise<any> {
    const { id, userType } = user;

    const gymProfile = await this.gymRepository.manager.query(`
    SELECT
      gym.id AS "GymId",
      usr.id AS "userId",
      usr."user_type" AS "userType",
      usr."email_id" AS "emailId",
      usr."phone_number" AS "phoneNumber",
      gym.step_name AS "stepName",
      gym.owner_name AS "ownerName",
      gym.owner_email AS "ownerEmail",
      gym.owner_phone_number AS "ownerPhoneNumber",
      gym.business_name AS "businessName",
      gym.business_email AS "businessEmail",
      gym.business_address AS "businessAddress",
      gym.business_contact AS "businessContact",
      business_hours AS "businessHours",
      gym.communication_address AS "communicationAddress",
      gym.photos AS "photos",
      gym_categories_subcategories.category_id AS "category",
      gym.description AS "description",
      gym.waiver AS "waiver",
      gym.stripe_account_id AS "stripeAccountId",
      gym.google_business_profile AS "googleBusinessProfile",
      CASE
        WHEN gym.status = ${GymStatus.Approved} THEN 'Approved'
        WHEN gym.status = ${GymStatus.Declined} THEN 'Declined'
        WHEN gym.status = ${GymStatus.Pending} THEN 'Pending'
        WHEN gym.status = ${GymStatus.Suspended} THEN 'Suspended'
      END AS "status"
      FROM
        users as usr
      LEFT JOIN
       gyms as gym on usr.id = gym."userId"
      LEFT JOIN 
      gym_categories_subcategories on gym_categories_subcategories.gym_id=gym.id
      LEFT JOIN 
      business_hours on business_hours."gymId"=gym.id
      WHERE
        usr.id = ${id} AND usr."user_type" = ${userType}
  `);
    if (gymProfile.length > 0) {
      const modifiedUserProfile = { ...gymProfile[0] };
      delete modifiedUserProfile.id;

      return {
        status: true,
        message: `Gym profile detail`,
        data: {
          ...modifiedUserProfile,
          userType: UserType[modifiedUserProfile.userType],
        },
      };
    } else {
      return {
        status: false,
        message: 'Profile not found',
        data: null,
      };
    }
  }

  gymExists = async (id: number) => {
    const gymData = await this.gymRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return gymData;
  };
  async getGymById(gymId: number) {
    const gymData = await this.gymRepository.findOne({
      where: [{ id: gymId }],
      relations: [
        'instructors',
        'businessHours',
        'gymCategorySubcategories',
        'gymCategorySubcategories.subcategory',
        'amenities',
      ],
    });

    if (!gymData) {
      throw new NotFoundException("Gym doesn't exist.");
    }
    const gymCategorySubcategories = { ...gymData.gymCategorySubcategories };
    const categories = [];
    Object.keys(gymCategorySubcategories).forEach((i) => {
      const data = gymCategorySubcategories[i];
      if (categories.length > 0) {
        const currCatIndex = categories.findIndex(
          (cat) => data.categoryId == cat.categoryId,
        );
        if (currCatIndex > -1) {
          if (categories[currCatIndex]['subCategories']) {
            categories[currCatIndex]['subCategories'].push(data.subcategory);
          } else {
            categories[currCatIndex]['subCategories'] = [data.subcategory];
          }
          delete categories[currCatIndex]['subCategoryId'];
          delete categories[currCatIndex]['subcategory'];
        } else {
          const currCat = { ...data };
          currCat['subCategories'] = [data.subcategory];
          delete currCat['subCategoryId'];
          delete currCat['subcategory'];
          categories.push(currCat);
        }
      } else {
        const currCat = { ...data };
        currCat['subCategories'] = [data.subcategory];
        delete currCat['subCategoryId'];
        delete currCat['subcategory'];
        categories.push(currCat);
      }
    });
    gymData['categories'] = categories;
    delete gymData.gymCategorySubcategories;
    gymData['businessHours'] = this.getCookedBusinessHoursForResponse(
      gymData.businessHours,
    );
    gymData['businessCategory'] = GymType[gymData.category];
    delete gymData.category;
    return gymData;
  }

  async getGymByIdForUser(gymId: number) {
    const gymData = await getRepository(Gym)
      .createQueryBuilder('gym')
      .select([
        'gym.id',
        'gym.businessName',
        'gym.businessAddress',
        'gym.description',
        'gym.photos',
      ])
      .addSelect([
        'classes.id',
        'classes.name',
        'classes.about',
        'classes.duration',
        'classes.photoThumbnail',
      ])
      .addSelect(['amenities.id', 'amenities.name', 'amenities.image'])
      .innerJoin('gym.classes', 'classes')
      .leftJoin('gym.amenities', 'amenities')
      .where(
        'gym.id = :id and classes.status = :status and amenities.isActive = :isActive',
        {
          id: gymId,
          status: ClassStatus.Published,
          isActive: true,
        },
      )
      .getMany();

    return gymData;
  }

  async getBasicGymDetailsById(gymId: number) {
    const gymData = await this.gymRepository.findOne({
      select: [
        'id',
        'businessName',
        'description',
        'businessAddress',
        'photos',
      ],
      where: [{ id: gymId }],
      relations: ['amenities', 'classes'],
    });
    if (!gymData) {
      throw new NotFoundException("Gym doesn't exist.");
    }
    return gymData;
  }

  async updateGymOwnerProfileBasic(
    gymId: number,
    userOwnerData: GymProfileOwnerRequestDto,
    userId: number,
  ) {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });

    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const response = await this.gymRepository.update(
      { id: gym.id },
      {
        stepName: GymStepName.OWNER,
        ownerEmail: userOwnerData.ownerEmail,
        ownerName: userOwnerData.ownerName,
        ownerPhoneNumber: userOwnerData.ownerPhoneNumber,
        birthDate: userOwnerData.birthDate,
        status: GymStatus.Pending,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update gym profile',
      });
    }

    const updatedGym = await this.gymRepository.findOne({
      id: gym.id,
    });

    const {
      stepName,
      ownerEmail,
      ownerName,
      ownerPhoneNumber,
      birthDate,
      status,
    } = updatedGym;

    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: stepName,
      data: {
        ownerEmail: ownerEmail,
        ownerName: ownerName,
        ownerPhoneNumber: ownerPhoneNumber,
        birthDate: birthDate,
        status: GymStatus[status],
      },
    };
  }

  async updateGymBusinessProfileBasic(
    gymId: number,
    userBusinessData: GymProfileBusinessRequestDto,
    userId: number,
  ) {
    const categoryNumber = GymType[userBusinessData.category];
    if (categoryNumber === undefined) {
      throw new BadRequestException('Invalid category input!');
    }
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });

    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const response = await this.gymRepository.update(
      { id: gym.id },
      {
        stepName: GymStepName.BUSINESS,
        businessName: userBusinessData.businessName,
        businessEmail: userBusinessData.businessEmail,
        businessContact: userBusinessData.businessContact,
        category: categoryNumber,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update gym profile',
      });
    }

    const updatedGym = await this.gymRepository.findOne({
      id: gym.id,
    });

    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: updatedGym.stepName,
      data: {
        businessName: updatedGym.businessName,
        businessEmail: updatedGym.businessEmail,
        businessContact: updatedGym.businessContact,
        category: getGymBusinessCategoryText[updatedGym.category],
      },
    };
  }

  async updateGymBusinessAddressProfile(
    gymId: number,
    userBusinessData: GymProfileBusinessAddressRequestDto,
    userId: number,
  ) {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });
    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const response = await this.gymRepository.update(
      { id: gym.id },
      {
        stepName: GymStepName.ADDRESS,
        businessAddress: userBusinessData.businessAddress,
        businessPlaceId: userBusinessData.placeId,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update gym profile',
      });
    }

    const updatedGym = await this.gymRepository.findOne({
      id: gym.id,
    });

    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: updatedGym.stepName,
      data: {
        businessAddress: updatedGym.businessAddress,
        placeId: updatedGym.businessPlaceId,
      },
    };
  }

  async updateGymCommunicationAddressProfile(
    gymId: number,
    userBusinessData: GymProfileCommunicationAddressRequestDto,
    userId: number,
  ): Promise<any> {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });

    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const response = await this.gymRepository.update(
      { id: gym.id },
      {
        stepName: GymStepName.COMMUNICATION,
        communicationAddress: userBusinessData.communicationAddress,
        status: GymStatus.Pending,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update gym profile',
      });
    }

    const updatedGym = await this.gymRepository.findOne({ id: gym.id });

    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: updatedGym.stepName,
      data: {
        communicationAddress: updatedGym.communicationAddress,
      },
    };
  }

  async updateGymAboutAddressProfile(
    gymId: number,
    userBusinessData: GymProfileAboutBusinessRequestDto,
    userId: number,
  ) {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });
    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const response = await this.gymRepository.update(
      { id: gym.id },
      {
        stepName: GymStepName.ABOUT,
        description: userBusinessData.description,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update gym profile',
      });
    }

    const updatedGym = await this.gymRepository.findOne({
      id: gym.id,
    });

    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: updatedGym.stepName,
      data: {
        description: updatedGym.description,
      },
    };
  }

  async updateGymBusinessHoursProfile(
    gymId: number,
    userBusinessData: GymProfileBusinessOperatingHoursRequestDto,
  ) {
    const gym = await this.gymRepository.findOne(gymId);
    const classes = await this.classRepository.find({
      where: { gym: gymId, status: ClassStatus[ClassStatus.Published] },
    });
    if (classes && classes.length > 0) {
      throw new BadRequestException(
        'Classes scheduled for exisitng business hours!',
      );
    }
    const hoursBusinessData = this.getCookedBusinessHoursForDB(
      userBusinessData.data,
      gymId,
    );

    await this.businessHoursRepository.delete({ gymId: gymId });

    await this.businessHoursRepository.insert(hoursBusinessData);

    gym.stepName = GymStepName.HOURS;
    gym.save();
    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: GymStepName.HOURS,
      data: userBusinessData.data,
    };
  }

  async updateGymBusinessPhotosProfile(
    gymId: number,
    userBusinessData: GymProfilePhotosRequestDto,
    userId: number,
  ) {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });

    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const response = await this.gymRepository.update(
      { id: gym.id },
      {
        stepName: GymStepName.LOGO,
        photos: userBusinessData.photos,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update gym profile',
      });
    }

    const updatedGym = await this.gymRepository.findOne({
      id: gym.id,
    });

    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: updatedGym.stepName,
      data: {
        photos: updatedGym.photos,
      },
    };
  }

  async updateGymUserWaiverProfile(
    gymId: number,
    userBusinessData: GymProfileWaiverRequestDto,
    userId: number,
  ) {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });

    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const response = await this.gymRepository.update(
      { id: gym.id },
      {
        stepName: GymStepName.WAIVER,
        waiver: userBusinessData.waiver,
      },
    );

    const isUpdated = response.hasOwnProperty('affected');
    if (!isUpdated || response.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update gym profile',
      });
    }

    const updatedGym = await this.gymRepository.findOne({
      id: gym.id,
    });

    return {
      status: true,
      message: 'Gym profile updated successfully',
      stepName: updatedGym.stepName,
      data: {
        waiver: updatedGym.waiver,
      },
    };
  }

  async updateGymProfileCategory(
    gymId: number,
    gymProfileData: GymProfileCategoryRequestDto,
    userId: number,
  ): Promise<any> {
    const updatedUser = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });

    if (!updatedUser) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    const gymCategorySubCategories = [];
    for (const category of gymProfileData.categoryData) {
      if (category.subCategoryIds && category.subCategoryIds.length > 0) {
        for (const subCategoryId of category.subCategoryIds) {
          const gymCategorySubCategory = new GymCategorySubCategory();
          gymCategorySubCategory.gymId = Number(updatedUser.id);
          gymCategorySubCategory.categoryId = category.categoryId;
          gymCategorySubCategory.subCategoryId = subCategoryId;
          gymCategorySubCategories.push(gymCategorySubCategory);
        }
      } else {
        const gymCategorySubCategory = new GymCategorySubCategory();
        gymCategorySubCategory.gymId = Number(updatedUser.id);
        gymCategorySubCategory.categoryId = category.categoryId;
        gymCategorySubCategories.push(gymCategorySubCategory);
      }
    }
    await this.gymCategorySubCategoryRepository.delete({
      gymId: parseInt(`${updatedUser.id}`),
    });
    await this.gymCategorySubCategoryRepository
      .insert(gymCategorySubCategories)
      .catch((err) => {
        if (err.constraint == 'gym_category_subcategory_unique_constraint') {
          throw new BadRequestException(err.message);
        }
      });

    const gym = await this.gymRepository.findOne(gymId);
    gym.stepName = GymStepName.CATEGORY;
    gym.save();

    return {
      status: true,
      message: 'Gym Profile updated successfully',
      stepName: GymStepName.CATEGORY,
      data: gymProfileData,
    };
  }

  async updateGymUserAmenityProfile(
    gymId: number,
    ammenitiesData: GymProfileAmenityRequestDto,
    userId: number,
  ) {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
      relations: ['user', 'amenities'],
    });

    if (!gym) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }

    gym.amenities = await this.amenityRepository.findByIds(
      ammenitiesData.amenitiesIds,
    );
    gym.stepName = GymStepName.AMENITIES;

    await this.gymRepository.save(gym);

    return {
      status: true,
      message: 'Gym amenties updated successfully',
      stepName: GymStepName.AMENITIES,
      data: ammenitiesData,
    };
  }

  async getGymInstructors(gymId: number, userId: number): Promise<any> {
    const gymOwner = await this.gymRepository.findOne({
      where: [{ id: gymId, user: userId }],
    });

    if (!gymOwner) {
      throw new NotFoundException({
        status: false,
        message: 'Gym not found',
      });
    }
    const instructors = await this.instructorRepository
      .find({
        where: [
          {
            gym: gymId,
            active: true,
          },
        ],
        relations: ['certificates', 'trainedFor'],
        order: {
          name: 'ASC',
        },
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    for (let i = 0; i < instructors.length; i++) {
      let trainedFor = await this.trainedForRepository.find({
        where: { instructorId: instructors[i].id },
        relations: ['category', 'subcategory'],
      });
      trainedFor = serializeCategories(trainedFor);
      instructors[i].trainedFor = trainedFor;
    }

    return {
      status: true,
      message: 'Gym instructors fetched successfully',
      data: instructors,
    };
  }

  async updateGymStatus(gymId: number, status: GymStatus) {
    const gym = await this.gymRepository.findOne(gymId);

    if (!gym) {
      throw new NotFoundException('Gym not found');
    }

    gym.status = status;

    await this.gymRepository.save(gym);

    if (status === GymStatus.Approved) {
      return {
        status: true,
        message: 'Gym registration request approved successfully!',
      };
    } else if (status === GymStatus.Declined) {
      return {
        status: true,
        message: 'Gym registration request declined successfully!',
      };
    } else if (status === GymStatus.Suspended) {
      return {
        status: true,
        message: 'Gym status set to suspended successfully!',
      };
    } else {
      throw new InternalServerErrorException(
        'Error occurred while updating the gym status',
      );
    }
  }

  async updateGymProfile(gymId: number, payload: GymUpdateRequestDto) {
    const gym = await this.gymRepository.findOne({
      where: [{ id: gymId }],
      relations: ['amenities'],
    });
    try {
      if (payload.amenities) {
        gym.amenities = await this.amenityRepository.findByIds(
          payload.amenities,
        );
      }
      gym.description = payload.about ? payload.about : gym.description;
      gym.businessName = payload.businessName
        ? payload.businessName
        : gym.businessName;
      gym.category = payload.category
        ? UserType[payload.category]
        : gym.category;
      gym.photos = payload.photos ? payload.photos : gym.photos;
      gym.coverPhoto = payload.coverPhoto ? payload.coverPhoto : gym.coverPhoto;
      gym.waiver = payload.waiver ? payload.waiver : gym.waiver;
      gym.waiverName = payload.waiverName ? payload.waiverName : gym.waiverName;
      gym.category = payload.category
        ? GymType[payload.category]
        : gym.category;

      await this.gymRepository.save(gym);

      if (payload.businessHours) {
        const hoursBusinessData = this.getCookedBusinessHoursForDB(
          payload.businessHours,
          gymId,
        );
        await this.businessHoursRepository.delete({ gymId: gymId });
        await this.businessHoursRepository.insert(hoursBusinessData);
      }

      return {
        status: true,
        code: 200,
        message: 'Profile updated successfully.',
      };
    } catch (e) {
      throw new InternalServerErrorException(
        'Error occured while saving data.',
      );
    }
  }
  async updateFinancialDetails(
    gymId: number,
    financialDetails: FinancialDetails,
    paymentMode: PaymentMode,
  ) {
    const gym = await this.gymRepository.findOne(gymId);

    switch (paymentMode) {
      case PaymentMode.CreditCard:
        {
          const finDetail = <GymProfileFinancialCreditCardRequestDto>(
            financialDetails
          );
          const currentDate = new Date();
          const expiryDate = finDetail.expiryDate;
          const [expiryMonth, expiryYear] = expiryDate.split('/');

          const expiryDateObject = new Date(
            Number(`20${expiryYear}`),
            Number(expiryMonth),
          );

          if (expiryDateObject <= currentDate) {
            return {
              message: 'Card is expired',
            };
          }
        }
        break;
      default:
        throw new BadRequestException('Invalid Payment Type');
    }

    gym.financialDetails = financialDetails;

    await this.gymRepository.save(gym);

    return {
      status: true,
      message: 'Payment details updated successfully',
    };
  }

  getCookedBusinessHoursForDB = (
    rawBusinessHours: GBHRequest[],
    gymId: number,
  ) => {
    const cookedHours = [];
    rawBusinessHours.forEach((timeSlotData) => {
      timeSlotData.timeSlots.forEach((timeslot) => {
        const businessHours = new Business_Hour();
        businessHours.day = timeSlotData.day;
        businessHours.gymId = gymId;
        businessHours.open_time = timeslot.openTime;
        businessHours.close_time = timeslot.closeTime;
        businessHours.open24Hour = timeSlotData.open24Hour;
        cookedHours.push(businessHours);
      });
    });

    return cookedHours;
  };

  getCookedBusinessHoursForResponse = (timeSlots) => {
    const cookedHours = [];
    Object.keys(timeSlots).forEach((i) => {
      const timeslot = timeSlots[i];
      const slots = {
        openTime: timeslot.open_time,
        closeTime: timeslot.close_time,
      };

      const currHourIndex = cookedHours.findIndex(
        (hours) => timeslot.day == hours.day,
      );
      if (cookedHours.length === 0 || currHourIndex === -1) {
        cookedHours.push({
          day: timeslot.day,
          open24Hour: timeslot.open24Hour,
          timeSlots: [slots],
        });
      } else {
        cookedHours[currHourIndex].timeSlots.push(slots);
      }
    });
    return cookedHours;
  };

  async getGymReviews(gymId: string) {
    const placeId = await this.gymRepository.find({
      where: {
        id: gymId,
      },
      select: ['businessPlaceId'],
    });
    if (!(placeId.length > 0 && placeId[0].businessPlaceId)) {
      throw new NotFoundException('No reviews found');
    }
    const reviews = await getGoogleReviews(placeId[0].businessPlaceId);
    return {
      status: true,
      message: 'reviews fetched successfully',
      data: reviews,
    };
  }

  async getStripeConnectUrl(gymId) {
    try {
      const gym = await this.gymRepository.findOne(gymId);
      const res = await this.stripeService.getStripeConnectUrl(
        gym.stripeAccountId,
      );
      gym.stripeAccountId = res.stripeAccountId;
      gym.save();
      delete res.stripeAccountId;
      return {
        status: 200,
        message: 'data feteched successfully.',
        data: res,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
