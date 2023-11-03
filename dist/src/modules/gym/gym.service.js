"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const gym_entity_1 = require("./entities/gym.entity");
const gym_step_name_enum_1 = require("../../enums/gym-step-name.enum");
const gym_profile_enum_1 = require("../../enums/gym-profile.enum");
const business_hour_entity_1 = require("./entities/business_hour.entity");
const user_type_enum_1 = require("../../enums/user-type.enum");
const gym_category_subcategory_entity_1 = require("./entities/gym.category.subcategory.entity");
const instructor_entity_1 = require("../instructor/entities/instructor.entity");
const amenity_entity_1 = require("./entities/amenity.entity");
const gym_type_status_enum_1 = require("../../enums/gym-type-status.enum");
const gym_financial_enum_1 = require("../../enums/gym-financial.enum");
const class_enum_1 = require("../../enums/class.enum");
const class_entity_1 = require("../class/entities/class.entity");
const typeorm_2 = require("typeorm");
const services_1 = require("../../utils/services");
const transformUserData_utils_1 = require("../../utils/transformUserData.utils");
const trained_for_entity_1 = require("../instructor/entities/trained_for.entity");
const stripe_service_1 = require("../payments/stripe.service");
let GymService = class GymService {
    constructor(gymCategorySubCategoryRepository, gymRepository, businessHoursRepository, amenityRepository, instructorRepository, classRepository, trainedForRepository, stripeService) {
        this.gymCategorySubCategoryRepository = gymCategorySubCategoryRepository;
        this.gymRepository = gymRepository;
        this.businessHoursRepository = businessHoursRepository;
        this.amenityRepository = amenityRepository;
        this.instructorRepository = instructorRepository;
        this.classRepository = classRepository;
        this.trainedForRepository = trainedForRepository;
        this.stripeService = stripeService;
        this.gymExists = async (id) => {
            const gymData = await this.gymRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            return gymData;
        };
        this.getCookedBusinessHoursForDB = (rawBusinessHours, gymId) => {
            const cookedHours = [];
            rawBusinessHours.forEach((timeSlotData) => {
                timeSlotData.timeSlots.forEach((timeslot) => {
                    const businessHours = new business_hour_entity_1.Business_Hour();
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
        this.getCookedBusinessHoursForResponse = (timeSlots) => {
            const cookedHours = [];
            Object.keys(timeSlots).forEach((i) => {
                const timeslot = timeSlots[i];
                const slots = {
                    openTime: timeslot.open_time,
                    closeTime: timeslot.close_time,
                };
                const currHourIndex = cookedHours.findIndex((hours) => timeslot.day == hours.day);
                if (cookedHours.length === 0 || currHourIndex === -1) {
                    cookedHours.push({
                        day: timeslot.day,
                        open24Hour: timeslot.open24Hour,
                        timeSlots: [slots],
                    });
                }
                else {
                    cookedHours[currHourIndex].timeSlots.push(slots);
                }
            });
            return cookedHours;
        };
    }
    async getGymProfile(user) {
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
        WHEN gym.status = ${gym_type_status_enum_1.GymStatus.Approved} THEN 'Approved'
        WHEN gym.status = ${gym_type_status_enum_1.GymStatus.Declined} THEN 'Declined'
        WHEN gym.status = ${gym_type_status_enum_1.GymStatus.Pending} THEN 'Pending'
        WHEN gym.status = ${gym_type_status_enum_1.GymStatus.Suspended} THEN 'Suspended'
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
            const modifiedUserProfile = Object.assign({}, gymProfile[0]);
            delete modifiedUserProfile.id;
            return {
                status: true,
                message: `Gym profile detail`,
                data: Object.assign(Object.assign({}, modifiedUserProfile), { userType: user_type_enum_1.UserType[modifiedUserProfile.userType] }),
            };
        }
        else {
            return {
                status: false,
                message: 'Profile not found',
                data: null,
            };
        }
    }
    async getGymById(gymId) {
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
            throw new common_1.NotFoundException("Gym doesn't exist.");
        }
        const gymCategorySubcategories = Object.assign({}, gymData.gymCategorySubcategories);
        const categories = [];
        Object.keys(gymCategorySubcategories).forEach((i) => {
            const data = gymCategorySubcategories[i];
            if (categories.length > 0) {
                const currCatIndex = categories.findIndex((cat) => data.categoryId == cat.categoryId);
                if (currCatIndex > -1) {
                    if (categories[currCatIndex]['subCategories']) {
                        categories[currCatIndex]['subCategories'].push(data.subcategory);
                    }
                    else {
                        categories[currCatIndex]['subCategories'] = [data.subcategory];
                    }
                    delete categories[currCatIndex]['subCategoryId'];
                    delete categories[currCatIndex]['subcategory'];
                }
                else {
                    const currCat = Object.assign({}, data);
                    currCat['subCategories'] = [data.subcategory];
                    delete currCat['subCategoryId'];
                    delete currCat['subcategory'];
                    categories.push(currCat);
                }
            }
            else {
                const currCat = Object.assign({}, data);
                currCat['subCategories'] = [data.subcategory];
                delete currCat['subCategoryId'];
                delete currCat['subcategory'];
                categories.push(currCat);
            }
        });
        gymData['categories'] = categories;
        delete gymData.gymCategorySubcategories;
        gymData['businessHours'] = this.getCookedBusinessHoursForResponse(gymData.businessHours);
        gymData['businessCategory'] = gym_profile_enum_1.GymType[gymData.category];
        delete gymData.category;
        return gymData;
    }
    async getGymByIdForUser(gymId) {
        const gymData = await (0, typeorm_2.getRepository)(gym_entity_1.Gym)
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
            .where('gym.id = :id and classes.status = :status and amenities.isActive = :isActive', {
            id: gymId,
            status: class_enum_1.ClassStatus.Published,
            isActive: true,
        })
            .getMany();
        return gymData;
    }
    async getBasicGymDetailsById(gymId) {
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
            throw new common_1.NotFoundException("Gym doesn't exist.");
        }
        return gymData;
    }
    async updateGymOwnerProfileBasic(gymId, userOwnerData, userId) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const response = await this.gymRepository.update({ id: gym.id }, {
            stepName: gym_step_name_enum_1.GymStepName.OWNER,
            ownerEmail: userOwnerData.ownerEmail,
            ownerName: userOwnerData.ownerName,
            ownerPhoneNumber: userOwnerData.ownerPhoneNumber,
            birthDate: userOwnerData.birthDate,
            status: gym_type_status_enum_1.GymStatus.Pending,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
                status: true,
                message: 'Failed to update gym profile',
            });
        }
        const updatedGym = await this.gymRepository.findOne({
            id: gym.id,
        });
        const { stepName, ownerEmail, ownerName, ownerPhoneNumber, birthDate, status, } = updatedGym;
        return {
            status: true,
            message: 'Gym profile updated successfully',
            stepName: stepName,
            data: {
                ownerEmail: ownerEmail,
                ownerName: ownerName,
                ownerPhoneNumber: ownerPhoneNumber,
                birthDate: birthDate,
                status: gym_type_status_enum_1.GymStatus[status],
            },
        };
    }
    async updateGymBusinessProfileBasic(gymId, userBusinessData, userId) {
        const categoryNumber = gym_profile_enum_1.GymType[userBusinessData.category];
        if (categoryNumber === undefined) {
            throw new common_1.BadRequestException('Invalid category input!');
        }
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const response = await this.gymRepository.update({ id: gym.id }, {
            stepName: gym_step_name_enum_1.GymStepName.BUSINESS,
            businessName: userBusinessData.businessName,
            businessEmail: userBusinessData.businessEmail,
            businessContact: userBusinessData.businessContact,
            category: categoryNumber,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
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
                category: gym_profile_enum_1.getGymBusinessCategoryText[updatedGym.category],
            },
        };
    }
    async updateGymBusinessAddressProfile(gymId, userBusinessData, userId) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const response = await this.gymRepository.update({ id: gym.id }, {
            stepName: gym_step_name_enum_1.GymStepName.ADDRESS,
            businessAddress: userBusinessData.businessAddress,
            businessPlaceId: userBusinessData.placeId,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
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
    async updateGymCommunicationAddressProfile(gymId, userBusinessData, userId) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const response = await this.gymRepository.update({ id: gym.id }, {
            stepName: gym_step_name_enum_1.GymStepName.COMMUNICATION,
            communicationAddress: userBusinessData.communicationAddress,
            status: gym_type_status_enum_1.GymStatus.Pending,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
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
    async updateGymAboutAddressProfile(gymId, userBusinessData, userId) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const response = await this.gymRepository.update({ id: gym.id }, {
            stepName: gym_step_name_enum_1.GymStepName.ABOUT,
            description: userBusinessData.description,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
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
    async updateGymBusinessHoursProfile(gymId, userBusinessData) {
        const gym = await this.gymRepository.findOne(gymId);
        const classes = await this.classRepository.find({
            where: { gym: gymId, status: class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published] },
        });
        if (classes && classes.length > 0) {
            throw new common_1.BadRequestException('Classes scheduled for exisitng business hours!');
        }
        const hoursBusinessData = this.getCookedBusinessHoursForDB(userBusinessData.data, gymId);
        await this.businessHoursRepository.delete({ gymId: gymId });
        await this.businessHoursRepository.insert(hoursBusinessData);
        gym.stepName = gym_step_name_enum_1.GymStepName.HOURS;
        gym.save();
        return {
            status: true,
            message: 'Gym profile updated successfully',
            stepName: gym_step_name_enum_1.GymStepName.HOURS,
            data: userBusinessData.data,
        };
    }
    async updateGymBusinessPhotosProfile(gymId, userBusinessData, userId) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const response = await this.gymRepository.update({ id: gym.id }, {
            stepName: gym_step_name_enum_1.GymStepName.LOGO,
            photos: userBusinessData.photos,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
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
    async updateGymUserWaiverProfile(gymId, userBusinessData, userId) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const response = await this.gymRepository.update({ id: gym.id }, {
            stepName: gym_step_name_enum_1.GymStepName.WAIVER,
            waiver: userBusinessData.waiver,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
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
    async updateGymProfileCategory(gymId, gymProfileData, userId) {
        const updatedUser = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!updatedUser) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        const gymCategorySubCategories = [];
        for (const category of gymProfileData.categoryData) {
            if (category.subCategoryIds && category.subCategoryIds.length > 0) {
                for (const subCategoryId of category.subCategoryIds) {
                    const gymCategorySubCategory = new gym_category_subcategory_entity_1.GymCategorySubCategory();
                    gymCategorySubCategory.gymId = Number(updatedUser.id);
                    gymCategorySubCategory.categoryId = category.categoryId;
                    gymCategorySubCategory.subCategoryId = subCategoryId;
                    gymCategorySubCategories.push(gymCategorySubCategory);
                }
            }
            else {
                const gymCategorySubCategory = new gym_category_subcategory_entity_1.GymCategorySubCategory();
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
                throw new common_1.BadRequestException(err.message);
            }
        });
        const gym = await this.gymRepository.findOne(gymId);
        gym.stepName = gym_step_name_enum_1.GymStepName.CATEGORY;
        gym.save();
        return {
            status: true,
            message: 'Gym Profile updated successfully',
            stepName: gym_step_name_enum_1.GymStepName.CATEGORY,
            data: gymProfileData,
        };
    }
    async updateGymUserAmenityProfile(gymId, ammenitiesData, userId) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
            relations: ['user', 'amenities'],
        });
        if (!gym) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Gym not found',
            });
        }
        gym.amenities = await this.amenityRepository.findByIds(ammenitiesData.amenitiesIds);
        gym.stepName = gym_step_name_enum_1.GymStepName.AMENITIES;
        await this.gymRepository.save(gym);
        return {
            status: true,
            message: 'Gym amenties updated successfully',
            stepName: gym_step_name_enum_1.GymStepName.AMENITIES,
            data: ammenitiesData,
        };
    }
    async getGymInstructors(gymId, userId) {
        const gymOwner = await this.gymRepository.findOne({
            where: [{ id: gymId, user: userId }],
        });
        if (!gymOwner) {
            throw new common_1.NotFoundException({
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
            throw new common_1.BadRequestException(err.message);
        });
        for (let i = 0; i < instructors.length; i++) {
            let trainedFor = await this.trainedForRepository.find({
                where: { instructorId: instructors[i].id },
                relations: ['category', 'subcategory'],
            });
            trainedFor = (0, transformUserData_utils_1.serializeCategories)(trainedFor);
            instructors[i].trainedFor = trainedFor;
        }
        return {
            status: true,
            message: 'Gym instructors fetched successfully',
            data: instructors,
        };
    }
    async updateGymStatus(gymId, status) {
        const gym = await this.gymRepository.findOne(gymId);
        if (!gym) {
            throw new common_1.NotFoundException('Gym not found');
        }
        gym.status = status;
        await this.gymRepository.save(gym);
        if (status === gym_type_status_enum_1.GymStatus.Approved) {
            return {
                status: true,
                message: 'Gym registration request approved successfully!',
            };
        }
        else if (status === gym_type_status_enum_1.GymStatus.Declined) {
            return {
                status: true,
                message: 'Gym registration request declined successfully!',
            };
        }
        else if (status === gym_type_status_enum_1.GymStatus.Suspended) {
            return {
                status: true,
                message: 'Gym status set to suspended successfully!',
            };
        }
        else {
            throw new common_1.InternalServerErrorException('Error occurred while updating the gym status');
        }
    }
    async updateGymProfile(gymId, payload) {
        const gym = await this.gymRepository.findOne({
            where: [{ id: gymId }],
            relations: ['amenities'],
        });
        try {
            if (payload.amenities) {
                gym.amenities = await this.amenityRepository.findByIds(payload.amenities);
            }
            gym.description = payload.about ? payload.about : gym.description;
            gym.businessName = payload.businessName
                ? payload.businessName
                : gym.businessName;
            gym.category = payload.category
                ? user_type_enum_1.UserType[payload.category]
                : gym.category;
            gym.photos = payload.photos ? payload.photos : gym.photos;
            gym.coverPhoto = payload.coverPhoto ? payload.coverPhoto : gym.coverPhoto;
            gym.waiver = payload.waiver ? payload.waiver : gym.waiver;
            gym.waiverName = payload.waiverName ? payload.waiverName : gym.waiverName;
            gym.category = payload.category
                ? gym_profile_enum_1.GymType[payload.category]
                : gym.category;
            await this.gymRepository.save(gym);
            if (payload.businessHours) {
                const hoursBusinessData = this.getCookedBusinessHoursForDB(payload.businessHours, gymId);
                await this.businessHoursRepository.delete({ gymId: gymId });
                await this.businessHoursRepository.insert(hoursBusinessData);
            }
            return {
                status: true,
                code: 200,
                message: 'Profile updated successfully.',
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Error occured while saving data.');
        }
    }
    async updateFinancialDetails(gymId, financialDetails, paymentMode) {
        const gym = await this.gymRepository.findOne(gymId);
        switch (paymentMode) {
            case gym_financial_enum_1.PaymentMode.CreditCard:
                {
                    const finDetail = (financialDetails);
                    const currentDate = new Date();
                    const expiryDate = finDetail.expiryDate;
                    const [expiryMonth, expiryYear] = expiryDate.split('/');
                    const expiryDateObject = new Date(Number(`20${expiryYear}`), Number(expiryMonth));
                    if (expiryDateObject <= currentDate) {
                        return {
                            message: 'Card is expired',
                        };
                    }
                }
                break;
            default:
                throw new common_1.BadRequestException('Invalid Payment Type');
        }
        gym.financialDetails = financialDetails;
        await this.gymRepository.save(gym);
        return {
            status: true,
            message: 'Payment details updated successfully',
        };
    }
    async getGymReviews(gymId) {
        const placeId = await this.gymRepository.find({
            where: {
                id: gymId,
            },
            select: ['businessPlaceId'],
        });
        if (!(placeId.length > 0 && placeId[0].businessPlaceId)) {
            throw new common_1.NotFoundException('No reviews found');
        }
        const reviews = await (0, services_1.getGoogleReviews)(placeId[0].businessPlaceId);
        return {
            status: true,
            message: 'reviews fetched successfully',
            data: reviews,
        };
    }
    async getStripeConnectUrl(gymId) {
        try {
            const gym = await this.gymRepository.findOne(gymId);
            const res = await this.stripeService.getStripeConnectUrl(gym.stripeAccountId);
            gym.stripeAccountId = res.stripeAccountId;
            gym.save();
            delete res.stripeAccountId;
            return {
                status: 200,
                message: 'data feteched successfully.',
                data: res,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
};
GymService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gym_category_subcategory_entity_1.GymCategorySubCategory)),
    __param(1, (0, typeorm_1.InjectRepository)(gym_entity_1.Gym)),
    __param(2, (0, typeorm_1.InjectRepository)(business_hour_entity_1.Business_Hour)),
    __param(3, (0, typeorm_1.InjectRepository)(amenity_entity_1.Amenity)),
    __param(4, (0, typeorm_1.InjectRepository)(instructor_entity_1.Instructor)),
    __param(5, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __param(6, (0, typeorm_1.InjectRepository)(trained_for_entity_1.InstructorTrainedFor)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        stripe_service_1.StripeService])
], GymService);
exports.GymService = GymService;
//# sourceMappingURL=gym.service.js.map