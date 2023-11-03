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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_entity_1 = require("./entities/class.entity");
const class_category_subcategory_entity_1 = require("./entities/class-category-subcategory.entity");
const base_utils_1 = require("../../utils/base.utils");
const session_schedule_entity_1 = require("./entities/session-schedule.entity");
const instructor_entity_1 = require("../instructor/entities/instructor.entity");
const gym_entity_1 = require("../gym/entities/gym.entity");
const class_enum_1 = require("../../enums/class.enum");
const class_enum_2 = require("../../enums/class.enum");
const transformUserData_utils_1 = require("../../utils/transformUserData.utils");
const session_entity_1 = require("./entities/session.entity");
const favourites_entity_1 = require("./entities/favourites.entity");
const user_entity_1 = require("../user/entity/user.entity");
let ClassService = class ClassService {
    constructor(classRepository, classCategorySubcategoryRepository, sessionScheduleCofigRepository, instructorRepository, gymRepository, instructorRepo, sessionRepo, favouritesRepository, userRepository) {
        this.classRepository = classRepository;
        this.classCategorySubcategoryRepository = classCategorySubcategoryRepository;
        this.sessionScheduleCofigRepository = sessionScheduleCofigRepository;
        this.instructorRepository = instructorRepository;
        this.gymRepository = gymRepository;
        this.instructorRepo = instructorRepo;
        this.sessionRepo = sessionRepo;
        this.favouritesRepository = favouritesRepository;
        this.userRepository = userRepository;
    }
    async create(gymId, classPayload) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        try {
            const gym = await this.gymRepository.findOne(gymId, {
                relations: ['businessHours'],
            });
            if (!gym) {
                throw new common_1.BadRequestException('Incorrect Gym ID!');
            }
            if (classPayload.sessionSchedule) {
                const { startDate, endDate, startTime, endTime } = classPayload.sessionSchedule;
                if (new Date(startDate) < new Date()) {
                    throw new common_1.BadRequestException('sessionShedule start date should be greater than today');
                }
                if (new Date(endDate) < new Date()) {
                    throw new common_1.BadRequestException('sessionShedule end date should be greater than today');
                }
                if (endDate && new Date(startDate) > new Date(endDate)) {
                    throw new common_1.BadRequestException('sessionShedule start date should be less than end date');
                }
                if (base_utils_1.BaseUtils.isValidTimeString(startTime)) {
                    throw new common_1.BadRequestException('sessionShedule start time should be in hh:mm format');
                }
                if (base_utils_1.BaseUtils.isValidTimeString(endTime)) {
                    throw new common_1.BadRequestException('sessionShedule end time should be in hh:mm format');
                }
                if (!gym.businessHours) {
                    throw new common_1.BadRequestException('Please add business hours to the gym');
                }
            }
            const classData = this.classRepository.create();
            classData.about = (_a = classPayload.about) !== null && _a !== void 0 ? _a : null;
            classData.name = classPayload.name;
            classData.spots = (_b = classPayload.spots) !== null && _b !== void 0 ? _b : null;
            classData.addOns = (_c = classPayload.addOns) !== null && _c !== void 0 ? _c : null;
            classData.pricing = (_d = classPayload.pricing) !== null && _d !== void 0 ? _d : null;
            classData.difficulty = (_e = classPayload.difficulty) !== null && _e !== void 0 ? _e : null;
            classData.equipmentsRequired = (_f = classPayload.equipmentsRequired) !== null && _f !== void 0 ? _f : null;
            classData.photoCover = (_g = classPayload.photoCover) !== null && _g !== void 0 ? _g : null;
            classData.photoThumbnail = (_h = classPayload.photoThumbnail) !== null && _h !== void 0 ? _h : null;
            classData.status = (_j = classPayload.status) !== null && _j !== void 0 ? _j : null;
            if (classPayload.instructor) {
                classData.instructor = await this.instructorRepository.findByIds([
                    classPayload.instructor,
                ]);
                if (classData.instructor.length === 0) {
                    throw new common_1.BadRequestException('Instructor not found!');
                }
            }
            if (classPayload.sessionSchedule) {
                classData.sessionSchedule =
                    await this.sessionScheduleCofigRepository.save(classPayload.sessionSchedule);
            }
            classData.gym = gym;
            await this.validateSession(classData);
            await classData.save();
            const classCategorySubcategory = [];
            if (classPayload.category &&
                classPayload.subCategories &&
                classPayload.subCategories.length > 0) {
                for (const subCategoryId of classPayload.subCategories) {
                    const classCatSubcat = new class_category_subcategory_entity_1.ClassCategorySubcategory();
                    classCatSubcat.class = classData;
                    classCatSubcat.categoryId = classPayload.category;
                    classCatSubcat.subCategoryId = subCategoryId;
                    classCategorySubcategory.push(classCatSubcat);
                }
            }
            else {
                const classCatSubcat = new class_category_subcategory_entity_1.ClassCategorySubcategory();
                classCatSubcat.class = classData;
                classCatSubcat.categoryId = classPayload.category;
                classCategorySubcategory.push(classCatSubcat);
            }
            classPayload.category &&
                (await this.classCategorySubcategoryRepository.insert(classCategorySubcategory));
            if (classPayload.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]) {
                await this.saveSessionData(classData);
            }
            return {
                status: true,
                message: 'Class added successfully',
                data: classData,
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(e.message);
            }
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
    async validateSession(classData) {
        const { startDate, startTime, endTime } = classData.sessionSchedule;
        const startDay = new Date(startDate).getDay();
        const dayIndex = classData.gym.businessHours.findIndex((hour) => hour.day === startDay);
        const businessHour = classData.gym.businessHours[dayIndex];
        if (dayIndex < 0) {
            throw new common_1.BadRequestException('Start time and end time cannot be outside business operating days/hours.');
        }
        if (!businessHour.open24Hour) {
            const validStartTime = base_utils_1.BaseUtils.isTimeBetween(`${startTime}:00`, businessHour.open_time, businessHour.close_time);
            const validEndTime = base_utils_1.BaseUtils.isTimeBetween(`${endTime}:00`, businessHour.open_time, businessHour.close_time);
            if (!validStartTime || !validEndTime) {
                throw new common_1.BadRequestException('Start time and end time cannot be outside business operating days/hours.');
            }
        }
    }
    async saveSessionData(classData) {
        const { sessionSchedule } = classData;
        if ((sessionSchedule === null || sessionSchedule === void 0 ? void 0 : sessionSchedule.repeat) === 'NoRepeat') {
            await this.createDontRepeatSession(classData);
        }
        else if ((sessionSchedule === null || sessionSchedule === void 0 ? void 0 : sessionSchedule.repeat) === 'Daily') {
            await this.createDailyRepeatSession(classData);
        }
        else if ((sessionSchedule === null || sessionSchedule === void 0 ? void 0 : sessionSchedule.repeat) === 'Weekly') {
            await this.createWeeklyRepeatSession(classData);
        }
        else if ((sessionSchedule === null || sessionSchedule === void 0 ? void 0 : sessionSchedule.repeat) === 'Monthly') {
            await this.createMonthlyRepeatSession(classData);
        }
        else if ((sessionSchedule === null || sessionSchedule === void 0 ? void 0 : sessionSchedule.repeat) === 'Custom') {
            await this.createCustomSession(classData);
        }
    }
    async createDontRepeatSession(classData) {
        return this.createSession(classData);
    }
    async createSession(classData) {
        const classSession = new session_entity_1.Session();
        classSession.onDate = classData.sessionSchedule.startDate;
        classSession.startTime = classData.sessionSchedule.startTime;
        classSession.endTime = classData.sessionSchedule.endTime;
        classSession.totalSeats = classData.spots;
        classSession.class = classData;
        const session = await classSession.save();
        return session;
    }
    async createDailyRepeatSession(classData) {
        const { startDate, endDate, startTime, endTime, occurences } = classData.sessionSchedule;
        const validDays = [];
        classData.gym.businessHours.forEach((businessHour) => {
            const validStartTime = base_utils_1.BaseUtils.isTimeBetween(startTime + '00', businessHour.open_time, businessHour.close_time);
            const validEndTime = base_utils_1.BaseUtils.isTimeBetween(endTime + '00', businessHour.open_time, businessHour.close_time);
            if (validStartTime && validEndTime) {
                validDays.push(businessHour.day);
            }
        });
        let dayNum = new Date(startDate).getDay();
        const nextDate = new Date(startDate);
        if (occurences) {
            let count = 0;
            while (count < occurences) {
                if (validDays.includes(dayNum)) {
                    await this.createSession(classData);
                    count++;
                }
                classData.sessionSchedule.startDate = nextDate;
                dayNum = nextDate.getDay();
                nextDate.setDate(nextDate.getDate() + 1);
            }
        }
        else {
            const curruntDate = new Date(startDate);
            while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
                if (validDays.includes(dayNum)) {
                    await this.createSession(classData);
                }
                curruntDate.setDate(curruntDate.getDate() + 1);
                classData.sessionSchedule.startDate = curruntDate;
                dayNum = curruntDate.getDay();
            }
        }
    }
    async createCustomSession(classData) {
        if (classData.sessionSchedule.customDetails.freq_unit == 'Day') {
            this.createCustomDailyRepeatSession(classData);
        }
        else if (classData.sessionSchedule.customDetails.freq_unit == 'Week') {
            this.createCustomWeeklyRepeatSession(classData);
        }
        else if (classData.sessionSchedule.customDetails.freq_unit == 'Month') {
            this.createCustomMonthlyRepeatSession(classData);
        }
    }
    async createWeeklyRepeatSession(classData) {
        const { startDate, endDate, occurences } = classData.sessionSchedule;
        if (occurences) {
            let count = 0;
            while (count < occurences) {
                await this.createSession(classData);
                count++;
                const newDate = new Date(classData.sessionSchedule.startDate);
                newDate.setDate(newDate.getDate() + 7);
                classData.sessionSchedule.startDate = newDate;
            }
        }
        else {
            let curruntDate = new Date(startDate);
            while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
                await this.createSession(classData);
                curruntDate = new Date(classData.sessionSchedule.startDate);
                curruntDate.setDate(curruntDate.getDate() + 7);
                classData.sessionSchedule.startDate = curruntDate;
            }
        }
    }
    async createCustomDailyRepeatSession(classData) {
        const { frequency } = classData.sessionSchedule.customDetails;
        const { startDate, endDate, startTime, endTime, occurences } = classData.sessionSchedule;
        let freq_index = 0;
        const validDays = [];
        classData.gym.businessHours.forEach((businessHour) => {
            const validStartTime = base_utils_1.BaseUtils.isTimeBetween(startTime + '00', businessHour.open_time, businessHour.close_time);
            const validEndTime = base_utils_1.BaseUtils.isTimeBetween(endTime + '00', businessHour.open_time, businessHour.close_time);
            if (validStartTime && validEndTime) {
                validDays.push(businessHour.day);
            }
        });
        let dayNum = new Date(startDate).getDay();
        let i = 0;
        const nextDate = new Date(startDate);
        if (occurences) {
            let count = 0;
            while (count < occurences) {
                if (validDays.includes(dayNum) && frequency * freq_index == i) {
                    await this.createSession(classData);
                    freq_index++;
                }
                i++;
                count++;
                classData.sessionSchedule.startDate = nextDate;
                dayNum = nextDate.getDay();
                nextDate.setDate(nextDate.getDate() + 1);
            }
        }
        else {
            const curruntDate = new Date(startDate);
            while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
                if (validDays.includes(dayNum) && frequency * freq_index == i) {
                    await this.createSession(classData);
                    freq_index++;
                }
                i++;
                curruntDate.setDate(curruntDate.getDate() + 1);
                classData.sessionSchedule.startDate = curruntDate;
                dayNum = curruntDate.getDay();
            }
        }
    }
    async createCustomWeeklyRepeatSession(classData) {
        const { startDate, endDate, occurences } = classData.sessionSchedule;
        const { frequency } = classData.sessionSchedule.customDetails;
        const { weekly_reps } = classData.sessionSchedule.customDetails;
        let freq_index = 0;
        let i = 0;
        const daysOfWeek = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ];
        for (let i_rep = 0; i_rep < weekly_reps.length; i_rep++) {
            i = 0;
            freq_index = 0;
            if (occurences) {
                while (i < occurences) {
                    if (frequency * freq_index == i) {
                        await this.createSession(classData);
                        freq_index++;
                    }
                    i++;
                    const newDate = new Date(classData.sessionSchedule.startDate);
                    newDate.setDate(newDate.getDate() + 7);
                    classData.sessionSchedule.startDate = newDate;
                }
            }
            else {
                let curruntDate = new Date(classData.sessionSchedule.startDate);
                while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
                    if (frequency * freq_index == i) {
                        await this.createSession(classData);
                        freq_index++;
                    }
                    i++;
                    curruntDate = new Date(classData.sessionSchedule.startDate);
                    curruntDate.setDate(curruntDate.getDate() + 7);
                    classData.sessionSchedule.startDate = curruntDate;
                }
            }
            const lastDayIndex = daysOfWeek.indexOf(weekly_reps[i_rep]);
            const thisDayIndex = daysOfWeek.indexOf(weekly_reps[i_rep + 1]);
            const diff = thisDayIndex - lastDayIndex;
            const newStartDate = new Date(startDate);
            newStartDate.setDate(newStartDate.getDate() + diff);
            classData.sessionSchedule.startDate = newStartDate;
        }
    }
    async createMonthlyRepeatSession(classData) {
        const { startDate, endDate, occurences } = classData.sessionSchedule;
        const repeatDayOfWeek = new Date(startDate).getDay();
        const repeatWeekOfMonth = Math.floor((new Date(startDate).getDate() - 1) / 7) + 1;
        const dayString = base_utils_1.BaseUtils.dayOfWeekAsString(repeatDayOfWeek);
        if (occurences) {
            let count = 0;
            while (count < occurences) {
                await this.createSession(classData);
                count++;
                let currentYear = new Date(classData.sessionSchedule.startDate).getFullYear();
                let currentMonth = new Date(classData.sessionSchedule.startDate).getMonth();
                if (currentMonth == 12) {
                    currentYear++;
                    currentMonth = 1;
                }
                else {
                    currentMonth++;
                }
                const nextDate = base_utils_1.BaseUtils.getNthWeekdayOfMonth(currentYear, currentMonth, dayString, repeatWeekOfMonth);
                classData.sessionSchedule.startDate = new Date(nextDate);
            }
        }
        else {
            let curruntDate = new Date(startDate);
            while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
                await this.createSession(classData);
                let currentYear = new Date(classData.sessionSchedule.startDate).getFullYear();
                let currentMonth = new Date(classData.sessionSchedule.startDate).getMonth();
                if (currentMonth == 12) {
                    currentYear++;
                    currentMonth = 1;
                }
                else {
                    currentMonth++;
                }
                curruntDate = base_utils_1.BaseUtils.getNthWeekdayOfMonth(currentYear, currentMonth, dayString, repeatWeekOfMonth);
                classData.sessionSchedule.startDate = new Date(curruntDate);
            }
        }
    }
    async createCustomMonthlyRepeatSession(classData) {
        const { startDate, endDate, occurences } = classData.sessionSchedule;
        const { frequency } = classData.sessionSchedule.customDetails;
        const repeatDayOfWeek = new Date(startDate).getDay();
        const repeatWeekOfMonth = Math.floor((new Date(startDate).getDate() - 1) / 7) + 1;
        const dayString = base_utils_1.BaseUtils.dayOfWeekAsString(repeatDayOfWeek);
        let freq_index = 0;
        let i = 0;
        if (occurences) {
            while (i < occurences) {
                if (frequency * freq_index == i) {
                    await this.createSession(classData);
                    freq_index++;
                }
                let currentYear = new Date(classData.sessionSchedule.startDate).getFullYear();
                let currentMonth = new Date(classData.sessionSchedule.startDate).getMonth();
                if (currentMonth == 12) {
                    currentYear++;
                    currentMonth = 1;
                }
                else {
                    currentMonth++;
                }
                const nextDate = base_utils_1.BaseUtils.getNthWeekdayOfMonth(currentYear, currentMonth, dayString, repeatWeekOfMonth);
                classData.sessionSchedule.startDate = new Date(nextDate);
                i++;
            }
        }
        else {
            let curruntDate = new Date(startDate);
            while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
                if (frequency * freq_index == i) {
                    await this.createSession(classData);
                    freq_index++;
                }
                let currentYear = new Date(classData.sessionSchedule.startDate).getFullYear();
                let currentMonth = new Date(classData.sessionSchedule.startDate).getMonth();
                if (currentMonth == 12) {
                    currentYear++;
                    currentMonth = 1;
                }
                else {
                    currentMonth++;
                }
                curruntDate = base_utils_1.BaseUtils.getNthWeekdayOfMonth(currentYear, currentMonth, dayString, repeatWeekOfMonth);
                classData.sessionSchedule.startDate = new Date(curruntDate);
                i++;
            }
        }
    }
    async findAll(queryParams, gymId) {
        const classStatus = queryParams.status
            ? class_enum_1.ClassStatus[queryParams.status]
            : class_enum_1.ClassStatus.Published;
        const classes = this.classRepository
            .createQueryBuilder('class')
            .select(['class.id, class.name', 'class.spots'])
            .addSelect(`case when class.difficulty=${class_enum_2.Difficulty.Beginner} then '${class_enum_2.Difficulty[class_enum_2.Difficulty.Beginner]}' when class.difficulty=${class_enum_2.Difficulty.Intermediate} then '${class_enum_2.Difficulty[class_enum_2.Difficulty.Intermediate]}' else '${class_enum_2.Difficulty[class_enum_2.Difficulty.Experienced]}' end`, 'class_difficulty')
            .addSelect('instructor.name')
            .addSelect('sessionSchedule.endTime - sessionSchedule.startTime', 'duration')
            .addSelect(['sessionSchedule.startTime', 'sessionSchedule.endTime'])
            .addSelect("TO_CHAR(sessionSchedule.startDate, 'YYYY-MM-DD')", 'sessionSchedule_start_date')
            .addSelect("TO_CHAR(sessionSchedule.endDate, 'YYYY-MM-DD')", 'sessionSchedule_end_date')
            .innerJoin('class.sessionSchedule', 'sessionSchedule')
            .leftJoin('class.instructor', 'instructor');
        classes.where('status= :status and class.gymId= :gymId', {
            status: classStatus,
            gymId,
        });
        if (queryParams.trainerIds) {
            classes.andWhere('instructor.id in (:ids)', {
                ids: queryParams.trainerIds,
            });
        }
        if (queryParams.name) {
            classes.andWhere('name like :name', {
                name: `%${queryParams.name}%`,
            });
        }
        if (queryParams.difficulty) {
            classes.andWhere('difficulty = :difficulty', {
                difficulty: class_enum_2.Difficulty[queryParams.difficulty],
            });
        }
        if (queryParams.startDate && queryParams.endDate) {
            classes.andWhere('((sessionSchedule.start_date between :startDate  and :endDate) OR sessionSchedule.end_date between :startDate  and :endDate)', {
                startDate: queryParams.startDate,
                endDate: queryParams.endDate,
            });
        }
        else if (queryParams.startDate && queryParams.startTime) {
            classes.andWhere('(sessionSchedule.start_date > :startDate) or (sessionSchedule.start_date = :startDate and sessionSchedule.start_time > :startTime ) ', {
                startDate: queryParams.startDate,
                startTime: queryParams.startTime,
            });
        }
        else if (queryParams.endDate && queryParams.endTime) {
            classes.andWhere('((sessionSchedule.end_date < :endDate )or (sessionSchedule.end_date = :endDate and sessionSchedule.end_time < :endTime ))  ', {
                endDate: queryParams.endDate,
                endTime: queryParams.endTime,
            });
        }
        if (queryParams.startTime && queryParams.endTime) {
            classes.andWhere('((sessionSchedule.start_time between :startTime  and :endTime) OR (sessionSchedule.end_time between :startTime  and :endTime) )', {
                startTime: `${queryParams.startTime}:00`,
                endTime: `${queryParams.startTime}:00`,
            });
        }
        if (queryParams.priceMax && queryParams.priceMin) {
            classes.andWhere("cast(class.pricing->>'session' as integer) between :priceMin  and :priceMax", {
                priceMax: queryParams.priceMax,
                priceMin: queryParams.priceMin,
            });
        }
        if (queryParams.slotsMax && queryParams.slotsMin) {
            classes.andWhere('spots between :slotsMin  and :slotsMax', {
                slotsMax: queryParams.slotsMax,
                slotsMin: queryParams.slotsMin,
            });
        }
        if (queryParams.categoryIds) {
            classes.andWhere('(select category_id from class_category_subcategory ccs where ccs.category_id in (:catIds) limit 1) is not null', {
                catIds: queryParams.categoryIds,
            });
        }
        const count = (await classes.getRawMany()).length;
        classes.limit(queryParams.take).offset(queryParams.skip);
        const data = await classes.getRawMany();
        return {
            status: true,
            message: 'Classes fetched successfully',
            data: { classes: data, numberOfRecords: count },
        };
    }
    async findClassForUsers(queryParams) {
        const classes = this.classRepository
            .createQueryBuilder('class')
            .select([
            'class.id',
            'class.name',
            'class.photo_thumbnail',
            'class.difficulty',
            'class.duration',
            'class.spots',
        ])
            .addSelect('instructor.name')
            .addSelect('sessionSchedule.endTime - sessionSchedule.startTime', 'duration')
            .addSelect(['sessionSchedule.startTime', 'sessionSchedule.startDate'])
            .innerJoin('class.sessionSchedule', 'sessionSchedule')
            .leftJoin('class.instructor', 'instructor');
        classes.where('status= :status', {
            status: class_enum_1.ClassStatus.Published,
        });
        if (queryParams.name) {
            classes.andWhere('class.name like :name', {
                name: `%${queryParams.name}%`,
            });
        }
        if (queryParams.difficulty) {
            classes.andWhere('difficulty = :difficulty', {
                difficulty: class_enum_2.Difficulty[queryParams.difficulty],
            });
        }
        if (queryParams.startDate && queryParams.endDate) {
            classes.andWhere('((sessionSchedule.start_date between :startDate  and :endDate) OR sessionSchedule.end_date between :startDate  and :endDate)', {
                startDate: queryParams.startDate,
                endDate: queryParams.endDate,
            });
        }
        if (queryParams.startTime && queryParams.endTime) {
            classes.andWhere('((sessionSchedule.start_time between :startTime  and :endTime) OR (sessionSchedule.end_time between :startTime  and :endTime) )', {
                startTime: `${queryParams.startTime}:00`,
                endTime: `${queryParams.startTime}:00`,
            });
        }
        if (queryParams.priceMax && queryParams.priceMin) {
            classes.andWhere("cast(class.pricing->>'session' as integer) between :priceMin  and :priceMax", {
                priceMax: queryParams.priceMax,
                priceMin: queryParams.priceMin,
            });
        }
        if (queryParams.slotsMax || queryParams.slotsMin) {
            classes.andWhere('spots between :slotsMin  and :slotsMax', {
                slotsMax: queryParams.slotsMax ? queryParams.slotsMax : 1000000000,
                slotsMin: queryParams.slotsMin ? queryParams.slotsMin : 0,
            });
        }
        if (queryParams.orderBy || queryParams.orderId) {
            classes.orderBy(queryParams.orderBy, queryParams.orderId);
        }
        else {
            classes.orderBy('sessionSchedule.startDate', 'ASC');
        }
        const count = (await classes.getRawMany()).length;
        classes.limit(queryParams.take).offset(queryParams.skip);
        const data = await classes.getRawMany();
        return {
            status: true,
            message: 'Classes fetched successfully',
            data: { classes: data, numberOfRecords: count },
        };
    }
    async getClassDetailsById(classId) {
        try {
            const selectedClasses = await (0, typeorm_2.getRepository)(class_entity_1.Class)
                .createQueryBuilder('class')
                .select([
                'class.id',
                'class.name',
                'class.about',
                'class.difficulty',
                'class.pricing',
                'class.equipmentsRequired',
                'class.addOns',
            ])
                .addSelect(['instructor.id', 'instructor.name', 'instructor.photo'])
                .addSelect(['gym.id', 'gym.businessAddress', 'gym.financialDetails'])
                .addSelect([
                'sessionSchedule.id',
                'sessionSchedule.startTime',
                'sessionSchedule.endTime',
                'sessionSchedule.customDetails',
            ])
                .innerJoin('class.gym', 'gym')
                .leftJoin('class.sessionSchedule', 'sessionSchedule', 'class.sessionScheduleId = sessionSchedule.id')
                .leftJoin('class.instructor', 'instructor')
                .where('class.id = :id', { id: classId })
                .getOne();
            const duration = await this.sessionScheduleCofigRepository
                .createQueryBuilder('session_schedule')
                .select('end_time-start_time', 'duration')
                .where('id = :id', { id: selectedClasses.sessionSchedule.id })
                .getRawOne();
            const categories = await this.classCategorySubcategoryRepository
                .createQueryBuilder('classCategorySubcategory')
                .select(['classCategorySubcategory.id'])
                .select(['category.id', 'category.name'])
                .addSelect(['subcategory.id', 'subcategory.name'])
                .leftJoin('classCategorySubcategory.category', 'category')
                .leftJoin('classCategorySubcategory.subcategory', 'subcategory')
                .where('classCategorySubcategory.class_id = :classId', {
                classId: classId,
            })
                .getRawMany();
            const sessions = await this.sessionRepo
                .createQueryBuilder()
                .select([
                'session.id',
                'session.onDate',
                'session.startTime',
                'session.endTime',
                'session.totalSeats',
                'session.seatsFilled',
            ])
                .addSelect('session.totalSeats - session.seatsFilled', 'slotsAvailable')
                .addFrom('sessions', 'session')
                .where('session.class_id = :id and session.isActive = true', {
                id: classId,
            })
                .getRawMany();
            const classes = Object.assign(Object.assign(Object.assign(Object.assign({}, selectedClasses), { categories: await (0, transformUserData_utils_1.transformClassData)(categories) }), duration), { sessions });
            if (classes) {
                return {
                    status: true,
                    message: 'Classes fetched successfully',
                    data: classes,
                };
            }
            else {
                return {
                    status: false,
                    message: 'Class not found!',
                    data: {},
                };
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async updateClassDetailsById(gymId, classId, classPayload) {
        if (classPayload.sessionSchedule) {
            const { startDate, endDate, startTime, endTime } = classPayload.sessionSchedule;
            if (new Date(startDate) < new Date()) {
                throw new common_1.BadRequestException('sessionShedule start date should be greater than today');
            }
            if (new Date(endDate) < new Date()) {
                throw new common_1.BadRequestException('sessionShedule end date should be greater than today');
            }
            if (base_utils_1.BaseUtils.isValidTimeString(startTime)) {
                throw new common_1.BadRequestException('sessionShedule start time should be in hh:mm format');
            }
            if (base_utils_1.BaseUtils.isValidTimeString(endTime)) {
                throw new common_1.BadRequestException('sessionShedule end time should be in hh:mm format');
            }
        }
        try {
            const classes = await this.classRepository
                .createQueryBuilder('classes')
                .leftJoinAndSelect('classes.gym', 'gym')
                .innerJoinAndSelect('classes.instructor', 'instructor')
                .innerJoinAndSelect('classes.sessionSchedule', 'sessionSchedule')
                .innerJoinAndSelect('gym.businessHours', 'businessHours')
                .where('classes.id = :id and gym.id=:gymId and classes.status <> :status', {
                id: classId,
                gymId: gymId,
                status: class_enum_1.ClassStatus.Deleted,
            })
                .getOne();
            if (!classes) {
                throw new common_1.NotFoundException({
                    status: false,
                    message: 'Class not found!',
                });
            }
            if (new Date(classes.sessionSchedule.startDate) < new Date()) {
                throw new common_1.BadRequestException('Class already started!');
            }
            const sessionQuery = this.sessionRepo
                .createQueryBuilder('session')
                .where('session.seatsFilled > :count and session.class = :id', {
                count: 0,
                id: classId,
            });
            const sessionData = await sessionQuery.getMany();
            if (sessionData.length > 0) {
                throw new common_1.BadRequestException('Sessions already started filling!');
            }
            classes.name = classPayload.name ? classPayload.name : classes.name;
            classes.spots = classPayload.spots ? classPayload.spots : classes.spots;
            classes.about = classPayload.about ? classPayload.about : classes.about;
            classes.pricing = classPayload.pricing
                ? classPayload.pricing
                : classes.pricing;
            classes.equipmentsRequired = classPayload.equipmentsRequired
                ? classPayload.equipmentsRequired
                : classes.equipmentsRequired;
            if (classPayload.instructor) {
                const newInstructors = await this.instructorRepository.findByIds([
                    classPayload.instructor,
                ]);
                classes.instructor = newInstructors;
            }
            if (classPayload.sessionSchedule) {
                const sessions = await this.sessionRepo.find({
                    where: {
                        class: classId,
                    },
                });
                await this.sessionRepo.remove(sessions);
                classes.sessionSchedule = this.sessionScheduleCofigRepository.create(classPayload.sessionSchedule);
                this.validateSession(classes);
                classes.sessionSchedule =
                    await this.sessionScheduleCofigRepository.save(classPayload.sessionSchedule);
                if (classes.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]) {
                    await this.saveSessionData(classes);
                }
            }
            const res = await classes.save();
            return {
                status: 200,
                message: 'Class updated successfully!',
                data: res,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findOne(id) {
        const classData = await this.classRepository
            .findOne({
            where: {
                id: id,
                isActive: true,
            },
            relations: ['instructor', 'classCategorySubcategories'],
        })
            .catch((err) => {
            throw new common_1.BadRequestException(err.message);
        });
        if (!classData) {
            return {
                status: false,
                message: 'Class not found',
            };
        }
        else {
            return {
                status: true,
                message: 'Class fetched successfully',
                data: classData,
            };
        }
    }
    async delete(id) {
        try {
            await this.classRepository.update(id, {
                status: class_enum_1.ClassStatus[class_enum_1.ClassStatus.Deleted],
            });
            return {
                status: 200,
                message: 'Class deleted successfully.',
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
    isValidTiming(startTime, endTime, businessHours) {
        let isValid = false;
        businessHours.forEach((businessHour) => {
            if (businessHour.open24Hour ||
                (base_utils_1.BaseUtils.isTimeBetween(startTime, businessHour.open_time, businessHour.close_time) &&
                    base_utils_1.BaseUtils.isTimeBetween(endTime, businessHour.open_time, businessHour.close_time))) {
                isValid = true;
            }
        });
        return isValid;
    }
    async instructorDetails(classId, id) {
        const instructors = await this.instructorRepo
            .createQueryBuilder('instructor')
            .select([
            'instructor.name',
            'instructor.photo',
            'instructor.about',
            'instructor.expYears',
            'instructor.expMonths',
        ])
            .addSelect(['certificates.name'])
            .leftJoin('instructor.certificates', 'certificates')
            .leftJoin('instructor.classes', 'classes')
            .leftJoinAndSelect('instructor.trainedFor', 'trainedFor')
            .innerJoinAndSelect('trainedFor.category', 'category')
            .innerJoinAndSelect('trainedFor.subcategory', 'subcategory')
            .where('instructor.id = :id and instructor.active = true', { id: id })
            .andWhere('classes.id = :classId', { classId: classId })
            .getOne();
        if (instructors) {
            instructors['trainedFor'] = (0, transformUserData_utils_1.serializeCategories)(instructors.trainedFor);
            return {
                status: true,
                message: 'Instructor details fetched successfully',
                data: instructors,
            };
        }
        else {
            throw new common_1.NotFoundException('Instructor not found');
        }
    }
    async addToFavourites(userId, classId) {
        try {
            const favourites = this.favouritesRepository.create();
            const className = await this.classRepository.findOne(classId);
            if (className) {
                favourites.class = className;
            }
            else {
                throw new common_1.NotFoundException('Class not found!');
            }
            favourites.user = await this.userRepository.findOne(userId);
            await favourites.save();
            return {
                status: 200,
                message: 'Class added successfully',
            };
        }
        catch (e) {
            if (e.message.includes('duplicate key')) {
                throw new common_1.ConflictException('Class already added to favourites!');
            }
            if (e instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(e.message);
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async getFavourites(userId, queryParams) {
        const favourites = this.favouritesRepository
            .createQueryBuilder('favourites')
            .select([
            'class.id',
            'class.name',
            'class.photo_thumbnail',
            'class.difficulty',
        ])
            .addSelect('instructor.name')
            .addSelect('sessionSchedule.endTime - sessionSchedule.startTime', 'duration')
            .addSelect(['sessionSchedule.startTime', 'sessionSchedule.startDate'])
            .innerJoin('favourites.class', 'class')
            .innerJoin('class.sessionSchedule', 'sessionSchedule')
            .leftJoin('class.instructor', 'instructor')
            .where('status= :status and favourites.user = :user', {
            status: class_enum_1.ClassStatus.Published,
            user: userId,
        });
        if (queryParams.name) {
            favourites.andWhere('class.name like :name', {
                name: `%${queryParams.name}%`,
            });
        }
        const count = (await favourites.getRawMany()).length;
        favourites.limit(queryParams.take).offset(queryParams.skip);
        const data = await favourites.getRawMany();
        return {
            status: true,
            message: 'Classes fetched successfully',
            data: { classes: data, count },
        };
    }
    async removeFromFavourites(userId, classId) {
        try {
            const deleted = await this.favouritesRepository
                .createQueryBuilder('favourites')
                .delete()
                .where('class = :classId and user = :userId', {
                userId: userId,
                classId: classId,
            })
                .execute();
            if (deleted.affected === 0) {
                throw new common_1.BadRequestException('Class not in favourites!');
            }
            return {
                status: 200,
                message: 'Class removed from favourites successfully',
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(e.message);
            }
            if (e instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(e.message);
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
};
ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __param(1, (0, typeorm_1.InjectRepository)(class_category_subcategory_entity_1.ClassCategorySubcategory)),
    __param(2, (0, typeorm_1.InjectRepository)(session_schedule_entity_1.SessionSchedule)),
    __param(3, (0, typeorm_1.InjectRepository)(instructor_entity_1.Instructor)),
    __param(4, (0, typeorm_1.InjectRepository)(gym_entity_1.Gym)),
    __param(5, (0, typeorm_1.InjectRepository)(instructor_entity_1.Instructor)),
    __param(6, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(7, (0, typeorm_1.InjectRepository)(favourites_entity_1.Favourites)),
    __param(8, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClassService);
exports.ClassService = ClassService;
//# sourceMappingURL=class.service.js.map