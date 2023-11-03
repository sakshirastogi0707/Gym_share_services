import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Class } from './entities/class.entity';
import { ClassCategorySubcategory } from './entities/class-category-subcategory.entity';
import {
  ClassDto,
  ClassListSortRequestParamsDto,
  FavouritesListDto,
  UpdateClassDataDto,
} from './dto/class.dto';
import { ClassListRequestParamsDto } from './dto/class.dto';
import { BaseUtils } from 'src/utils/base.utils';
import { SessionSchedule } from './entities/session-schedule.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Gym } from '../gym/entities/gym.entity';
import { ClassStatus } from 'src/enums/class.enum';
import { Business_Hour } from '../gym/entities/business_hour.entity';
import { Difficulty } from 'src/enums/class.enum';
import {
  serializeCategories,
  transformClassData,
} from 'src/utils/transformUserData.utils';
import { Session } from './entities/session.entity';
import { Favourites } from './entities/favourites.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(ClassCategorySubcategory)
    private classCategorySubcategoryRepository: Repository<ClassCategorySubcategory>,
    @InjectRepository(SessionSchedule)
    private sessionScheduleCofigRepository: Repository<SessionSchedule>,
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
    @InjectRepository(Instructor)
    private instructorRepo: Repository<Instructor>,
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
    @InjectRepository(Favourites)
    private favouritesRepository: Repository<Favourites>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(gymId: number, classPayload: ClassDto) {
    try {
      const gym = await this.gymRepository.findOne(gymId, {
        relations: ['businessHours'],
      });
      if (!gym) {
        throw new BadRequestException('Incorrect Gym ID!');
      }
      if (classPayload.sessionSchedule) {
        const { startDate, endDate, startTime, endTime } =
          classPayload.sessionSchedule;
        if (new Date(startDate) < new Date()) {
          throw new BadRequestException(
            'sessionShedule start date should be greater than today',
          );
        }
        if (new Date(endDate) < new Date()) {
          throw new BadRequestException(
            'sessionShedule end date should be greater than today',
          );
        }
        if (endDate && new Date(startDate) > new Date(endDate)) {
          throw new BadRequestException(
            'sessionShedule start date should be less than end date',
          );
        }
        if (BaseUtils.isValidTimeString(startTime)) {
          throw new BadRequestException(
            'sessionShedule start time should be in hh:mm format',
          );
        }
        if (BaseUtils.isValidTimeString(endTime)) {
          throw new BadRequestException(
            'sessionShedule end time should be in hh:mm format',
          );
        }
        if (!gym.businessHours) {
          throw new BadRequestException('Please add business hours to the gym');
        }
      }
      const classData = this.classRepository.create();
      classData.about = classPayload.about ?? null;
      classData.name = classPayload.name;
      classData.spots = classPayload.spots ?? null;
      classData.addOns = classPayload.addOns ?? null;
      classData.pricing = classPayload.pricing ?? null;
      classData.difficulty = classPayload.difficulty ?? null;
      classData.equipmentsRequired = classPayload.equipmentsRequired ?? null;
      classData.photoCover = classPayload.photoCover ?? null;
      classData.photoThumbnail = classPayload.photoThumbnail ?? null;
      classData.status = classPayload.status ?? null;
      if (classPayload.instructor) {
        classData.instructor = await this.instructorRepository.findByIds([
          classPayload.instructor,
        ]);
        if (classData.instructor.length === 0) {
          throw new BadRequestException('Instructor not found!');
        }
      }
      if (classPayload.sessionSchedule) {
        classData.sessionSchedule =
          await this.sessionScheduleCofigRepository.save(
            classPayload.sessionSchedule,
          );
      }
      classData.gym = gym;
      await this.validateSession(classData);
      await classData.save();

      const classCategorySubcategory = [];
      if (
        classPayload.category &&
        classPayload.subCategories &&
        classPayload.subCategories.length > 0
      ) {
        for (const subCategoryId of classPayload.subCategories) {
          const classCatSubcat = new ClassCategorySubcategory();
          classCatSubcat.class = classData;
          classCatSubcat.categoryId = classPayload.category;
          classCatSubcat.subCategoryId = subCategoryId;
          classCategorySubcategory.push(classCatSubcat);
        }
      } else {
        const classCatSubcat = new ClassCategorySubcategory();
        classCatSubcat.class = classData;
        classCatSubcat.categoryId = classPayload.category;
        classCategorySubcategory.push(classCatSubcat);
      }

      classPayload.category &&
        (await this.classCategorySubcategoryRepository.insert(
          classCategorySubcategory,
        ));

      if (classPayload.status === ClassStatus[ClassStatus.Published]) {
        await this.saveSessionData(classData);
      }

      return {
        status: true,
        message: 'Class added successfully',
        data: classData,
      };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException(e.message);
    }
  }

  async validateSession(classData: Class) {
    const { startDate, startTime, endTime } = classData.sessionSchedule;
    const startDay = new Date(startDate).getDay();
    const dayIndex = classData.gym.businessHours.findIndex(
      (hour) => hour.day === startDay,
    );
    const businessHour = classData.gym.businessHours[dayIndex];
    if (dayIndex < 0) {
      throw new BadRequestException(
        'Start time and end time cannot be outside business operating days/hours.',
      );
    }
    if (!businessHour.open24Hour) {
      const validStartTime = BaseUtils.isTimeBetween(
        `${startTime}:00`,
        businessHour.open_time,
        businessHour.close_time,
      );
      const validEndTime = BaseUtils.isTimeBetween(
        `${endTime}:00`,
        businessHour.open_time,
        businessHour.close_time,
      );
      if (!validStartTime || !validEndTime) {
        throw new BadRequestException(
          'Start time and end time cannot be outside business operating days/hours.',
        );
      }
    }
  }
  async saveSessionData(classData: Class) {
    const { sessionSchedule } = classData;
    if (sessionSchedule?.repeat === 'NoRepeat') {
      await this.createDontRepeatSession(classData);
    } else if (sessionSchedule?.repeat === 'Daily') {
      await this.createDailyRepeatSession(classData);
    } else if (sessionSchedule?.repeat === 'Weekly') {
      await this.createWeeklyRepeatSession(classData);
    } else if (sessionSchedule?.repeat === 'Monthly') {
      await this.createMonthlyRepeatSession(classData);
    } else if (sessionSchedule?.repeat === 'Custom') {
      await this.createCustomSession(classData);
    }
  }
  async createDontRepeatSession(classData: Class) {
    return this.createSession(classData);
  }
  async createSession(classData: Class) {
    const classSession = new Session();
    classSession.onDate = classData.sessionSchedule.startDate;
    classSession.startTime = classData.sessionSchedule.startTime;
    classSession.endTime = classData.sessionSchedule.endTime;
    classSession.totalSeats = classData.spots;
    classSession.class = classData;
    const session = await classSession.save();
    return session;
  }
  async createDailyRepeatSession(classData: Class) {
    const { startDate, endDate, startTime, endTime, occurences } =
      classData.sessionSchedule;
    const validDays = [];
    classData.gym.businessHours.forEach((businessHour) => {
      const validStartTime = BaseUtils.isTimeBetween(
        startTime + '00',
        businessHour.open_time,
        businessHour.close_time,
      );
      const validEndTime = BaseUtils.isTimeBetween(
        endTime + '00',
        businessHour.open_time,
        businessHour.close_time,
      );
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
    } else {
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
  async createCustomSession(classData: Class) {
    if (classData.sessionSchedule.customDetails.freq_unit == 'Day') {
      this.createCustomDailyRepeatSession(classData);
    } else if (classData.sessionSchedule.customDetails.freq_unit == 'Week') {
      this.createCustomWeeklyRepeatSession(classData);
    } else if (classData.sessionSchedule.customDetails.freq_unit == 'Month') {
      this.createCustomMonthlyRepeatSession(classData);
    }
  }

  async createWeeklyRepeatSession(classData: Class) {
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
    } else {
      let curruntDate = new Date(startDate);
      while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
        await this.createSession(classData);
        curruntDate = new Date(classData.sessionSchedule.startDate);
        curruntDate.setDate(curruntDate.getDate() + 7);
        classData.sessionSchedule.startDate = curruntDate;
      }
    }
  }

  async createCustomDailyRepeatSession(classData: Class) {
    const { frequency } = classData.sessionSchedule.customDetails;
    const { startDate, endDate, startTime, endTime, occurences } =
      classData.sessionSchedule;
    let freq_index = 0;
    const validDays = [];
    classData.gym.businessHours.forEach((businessHour) => {
      const validStartTime = BaseUtils.isTimeBetween(
        startTime + '00',
        businessHour.open_time,
        businessHour.close_time,
      );
      const validEndTime = BaseUtils.isTimeBetween(
        endTime + '00',
        businessHour.open_time,
        businessHour.close_time,
      );
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
    } else {
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
  async createCustomWeeklyRepeatSession(classData: Class) {
    const { startDate, endDate, occurences } = classData.sessionSchedule;
    const { frequency } = classData.sessionSchedule.customDetails;
    const { weekly_reps } = classData.sessionSchedule.customDetails;
    let freq_index = 0;
    let i = 0;
    const daysOfWeek: string[] = [
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
      } else {
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
      const lastDayIndex: number = daysOfWeek.indexOf(weekly_reps[i_rep]);
      const thisDayIndex: number = daysOfWeek.indexOf(weekly_reps[i_rep + 1]);
      const diff = thisDayIndex - lastDayIndex;
      const newStartDate = new Date(startDate);
      newStartDate.setDate(newStartDate.getDate() + diff);
      classData.sessionSchedule.startDate = newStartDate;
    }
  }

  async createMonthlyRepeatSession(classData: Class) {
    const { startDate, endDate, occurences } = classData.sessionSchedule;
    const repeatDayOfWeek = new Date(startDate).getDay();
    const repeatWeekOfMonth =
      Math.floor((new Date(startDate).getDate() - 1) / 7) + 1;
    const dayString = BaseUtils.dayOfWeekAsString(repeatDayOfWeek);
    if (occurences) {
      let count = 0;
      while (count < occurences) {
        await this.createSession(classData);
        count++;
        let currentYear = new Date(
          classData.sessionSchedule.startDate,
        ).getFullYear();
        let currentMonth = new Date(
          classData.sessionSchedule.startDate,
        ).getMonth();
        if (currentMonth == 12) {
          currentYear++;
          currentMonth = 1;
        } else {
          currentMonth++;
        }
        const nextDate = BaseUtils.getNthWeekdayOfMonth(
          currentYear,
          currentMonth,
          dayString,
          repeatWeekOfMonth,
        );
        classData.sessionSchedule.startDate = new Date(nextDate);
      }
    } else {
      let curruntDate = new Date(startDate);
      while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
        await this.createSession(classData);
        let currentYear = new Date(
          classData.sessionSchedule.startDate,
        ).getFullYear();
        let currentMonth = new Date(
          classData.sessionSchedule.startDate,
        ).getMonth();
        if (currentMonth == 12) {
          currentYear++;
          currentMonth = 1;
        } else {
          currentMonth++;
        }
        curruntDate = BaseUtils.getNthWeekdayOfMonth(
          currentYear,
          currentMonth,
          dayString,
          repeatWeekOfMonth,
        );
        classData.sessionSchedule.startDate = new Date(curruntDate);
      }
    }
  }

  async createCustomMonthlyRepeatSession(classData: Class) {
    const { startDate, endDate, occurences } = classData.sessionSchedule;
    const { frequency } = classData.sessionSchedule.customDetails;
    const repeatDayOfWeek = new Date(startDate).getDay();
    const repeatWeekOfMonth =
      Math.floor((new Date(startDate).getDate() - 1) / 7) + 1;
    const dayString = BaseUtils.dayOfWeekAsString(repeatDayOfWeek);
    let freq_index = 0;
    let i = 0;
    if (occurences) {
      while (i < occurences) {
        if (frequency * freq_index == i) {
          await this.createSession(classData);
          freq_index++;
        }
        let currentYear = new Date(
          classData.sessionSchedule.startDate,
        ).getFullYear();
        let currentMonth = new Date(
          classData.sessionSchedule.startDate,
        ).getMonth();
        if (currentMonth == 12) {
          currentYear++;
          currentMonth = 1;
        } else {
          currentMonth++;
        }
        const nextDate = BaseUtils.getNthWeekdayOfMonth(
          currentYear,
          currentMonth,
          dayString,
          repeatWeekOfMonth,
        );
        classData.sessionSchedule.startDate = new Date(nextDate);
        i++;
      }
    } else {
      let curruntDate = new Date(startDate);
      while (curruntDate.valueOf() <= new Date(endDate).valueOf()) {
        if (frequency * freq_index == i) {
          await this.createSession(classData);
          freq_index++;
        }
        let currentYear = new Date(
          classData.sessionSchedule.startDate,
        ).getFullYear();
        let currentMonth = new Date(
          classData.sessionSchedule.startDate,
        ).getMonth();
        if (currentMonth == 12) {
          currentYear++;
          currentMonth = 1;
        } else {
          currentMonth++;
        }
        curruntDate = BaseUtils.getNthWeekdayOfMonth(
          currentYear,
          currentMonth,
          dayString,
          repeatWeekOfMonth,
        );
        classData.sessionSchedule.startDate = new Date(curruntDate);
        i++;
      }
    }
  }

  async findAll(queryParams: ClassListRequestParamsDto, gymId: string) {
    const classStatus = queryParams.status
      ? ClassStatus[queryParams.status]
      : ClassStatus.Published;
    const classes = this.classRepository
      .createQueryBuilder('class')
      .select(['class.id, class.name', 'class.spots'])
      .addSelect(
        `case when class.difficulty=${Difficulty.Beginner} then '${
          Difficulty[Difficulty.Beginner]
        }' when class.difficulty=${Difficulty.Intermediate} then '${
          Difficulty[Difficulty.Intermediate]
        }' else '${Difficulty[Difficulty.Experienced]}' end`,
        'class_difficulty',
      )
      .addSelect('instructor.name')
      .addSelect(
        'sessionSchedule.endTime - sessionSchedule.startTime',
        'duration',
      )
      .addSelect(['sessionSchedule.startTime', 'sessionSchedule.endTime'])
      .addSelect(
        "TO_CHAR(sessionSchedule.startDate, 'YYYY-MM-DD')",
        'sessionSchedule_start_date',
      )
      .addSelect(
        "TO_CHAR(sessionSchedule.endDate, 'YYYY-MM-DD')",
        'sessionSchedule_end_date',
      )
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
        difficulty: Difficulty[queryParams.difficulty],
      });
    }

    if (queryParams.startDate && queryParams.endDate) {
      classes.andWhere(
        '((sessionSchedule.start_date between :startDate  and :endDate) OR sessionSchedule.end_date between :startDate  and :endDate)',
        {
          startDate: queryParams.startDate,
          endDate: queryParams.endDate,
        },
      );
    } else if (queryParams.startDate && queryParams.startTime) {
      classes.andWhere(
        '(sessionSchedule.start_date > :startDate) or (sessionSchedule.start_date = :startDate and sessionSchedule.start_time > :startTime ) ',
        {
          startDate: queryParams.startDate,
          startTime: queryParams.startTime,
        },
      );
    } else if (queryParams.endDate && queryParams.endTime) {
      classes.andWhere(
        '((sessionSchedule.end_date < :endDate )or (sessionSchedule.end_date = :endDate and sessionSchedule.end_time < :endTime ))  ',
        {
          endDate: queryParams.endDate,
          endTime: queryParams.endTime,
        },
      );
    }

    if (queryParams.startTime && queryParams.endTime) {
      classes.andWhere(
        '((sessionSchedule.start_time between :startTime  and :endTime) OR (sessionSchedule.end_time between :startTime  and :endTime) )',
        {
          startTime: `${queryParams.startTime}:00`,
          endTime: `${queryParams.startTime}:00`,
        },
      );
    }

    if (queryParams.priceMax && queryParams.priceMin) {
      classes.andWhere(
        "cast(class.pricing->>'session' as integer) between :priceMin  and :priceMax",
        {
          priceMax: queryParams.priceMax,
          priceMin: queryParams.priceMin,
        },
      );
    }
    if (queryParams.slotsMax && queryParams.slotsMin) {
      classes.andWhere('spots between :slotsMin  and :slotsMax', {
        slotsMax: queryParams.slotsMax,
        slotsMin: queryParams.slotsMin,
      });
    }
    if (queryParams.categoryIds) {
      classes.andWhere(
        '(select category_id from class_category_subcategory ccs where ccs.category_id in (:catIds) limit 1) is not null',
        {
          catIds: queryParams.categoryIds,
        },
      );
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

  async findClassForUsers(queryParams: ClassListSortRequestParamsDto) {
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
      .addSelect(
        'sessionSchedule.endTime - sessionSchedule.startTime',
        'duration',
      )
      .addSelect(['sessionSchedule.startTime', 'sessionSchedule.startDate'])
      .innerJoin('class.sessionSchedule', 'sessionSchedule')
      .leftJoin('class.instructor', 'instructor');

    classes.where('status= :status', {
      status: ClassStatus.Published,
    });

    if (queryParams.name) {
      classes.andWhere('class.name like :name', {
        name: `%${queryParams.name}%`,
      });
    }
    if (queryParams.difficulty) {
      classes.andWhere('difficulty = :difficulty', {
        difficulty: Difficulty[queryParams.difficulty],
      });
    }
    if (queryParams.startDate && queryParams.endDate) {
      classes.andWhere(
        '((sessionSchedule.start_date between :startDate  and :endDate) OR sessionSchedule.end_date between :startDate  and :endDate)',
        {
          startDate: queryParams.startDate,
          endDate: queryParams.endDate,
        },
      );
    }
    if (queryParams.startTime && queryParams.endTime) {
      classes.andWhere(
        '((sessionSchedule.start_time between :startTime  and :endTime) OR (sessionSchedule.end_time between :startTime  and :endTime) )',
        {
          startTime: `${queryParams.startTime}:00`,
          endTime: `${queryParams.startTime}:00`,
        },
      );
    }
    if (queryParams.priceMax && queryParams.priceMin) {
      classes.andWhere(
        "cast(class.pricing->>'session' as integer) between :priceMin  and :priceMax",
        {
          priceMax: queryParams.priceMax,
          priceMin: queryParams.priceMin,
        },
      );
    }
    if (queryParams.slotsMax || queryParams.slotsMin) {
      classes.andWhere('spots between :slotsMin  and :slotsMax', {
        slotsMax: queryParams.slotsMax ? queryParams.slotsMax : 1000000000,
        slotsMin: queryParams.slotsMin ? queryParams.slotsMin : 0,
      });
    }
    if (queryParams.orderBy || queryParams.orderId) {
      classes.orderBy(queryParams.orderBy, queryParams.orderId);
    } else {
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

  async getClassDetailsById(classId: string) {
    try {
      const selectedClasses = await getRepository(Class)
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
        .leftJoin(
          'class.sessionSchedule',
          'sessionSchedule',
          'class.sessionScheduleId = sessionSchedule.id',
        )
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
      const classes = {
        ...selectedClasses,
        categories: await transformClassData(categories),
        ...duration,
        sessions,
      };
      if (classes) {
        return {
          status: true,
          message: 'Classes fetched successfully',
          data: classes,
        };
      } else {
        return {
          status: false,
          message: 'Class not found!',
          data: {},
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateClassDetailsById(
    gymId: string,
    classId: string,
    classPayload: UpdateClassDataDto,
  ) {
    if (classPayload.sessionSchedule) {
      const { startDate, endDate, startTime, endTime } =
        classPayload.sessionSchedule;
      if (new Date(startDate) < new Date()) {
        throw new BadRequestException(
          'sessionShedule start date should be greater than today',
        );
      }
      if (new Date(endDate) < new Date()) {
        throw new BadRequestException(
          'sessionShedule end date should be greater than today',
        );
      }
      if (BaseUtils.isValidTimeString(startTime)) {
        throw new BadRequestException(
          'sessionShedule start time should be in hh:mm format',
        );
      }
      if (BaseUtils.isValidTimeString(endTime)) {
        throw new BadRequestException(
          'sessionShedule end time should be in hh:mm format',
        );
      }
    }
    try {
      const classes = await this.classRepository
        .createQueryBuilder('classes')
        .leftJoinAndSelect('classes.gym', 'gym')
        .innerJoinAndSelect('classes.instructor', 'instructor')
        .innerJoinAndSelect('classes.sessionSchedule', 'sessionSchedule')
        .innerJoinAndSelect('gym.businessHours', 'businessHours')
        .where(
          'classes.id = :id and gym.id=:gymId and classes.status <> :status',
          {
            id: classId,
            gymId: gymId,
            status: ClassStatus.Deleted,
          },
        )
        .getOne();
      if (!classes) {
        throw new NotFoundException({
          status: false,
          message: 'Class not found!',
        });
      }

      if (new Date(classes.sessionSchedule.startDate) < new Date()) {
        throw new BadRequestException('Class already started!');
      }
      const sessionQuery = this.sessionRepo
        .createQueryBuilder('session')
        .where('session.seatsFilled > :count and session.class = :id', {
          count: 0,
          id: classId,
        });
      const sessionData = await sessionQuery.getMany();
      if (sessionData.length > 0) {
        throw new BadRequestException('Sessions already started filling!');
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
        classes.sessionSchedule = this.sessionScheduleCofigRepository.create(
          classPayload.sessionSchedule,
        );
        this.validateSession(classes);
        classes.sessionSchedule =
          await this.sessionScheduleCofigRepository.save(
            classPayload.sessionSchedule,
          );
        if (classes.status === ClassStatus[ClassStatus.Published]) {
          await this.saveSessionData(classes);
        }
      }
      const res = await classes.save();
      return {
        status: 200,
        message: 'Class updated successfully!',
        data: res,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    const classData: any = await this.classRepository
      .findOne({
        where: {
          id: id,
          isActive: true,
        },
        relations: ['instructor', 'classCategorySubcategories'],
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    if (!classData) {
      return {
        status: false,
        message: 'Class not found',
      };
    } else {
      return {
        status: true,
        message: 'Class fetched successfully',
        data: classData,
      };
    }
  }

  async delete(id: number) {
    try {
      await this.classRepository.update(id, {
        status: ClassStatus[ClassStatus.Deleted],
      });
      return {
        status: 200,
        message: 'Class deleted successfully.',
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  private isValidTiming(
    startTime: string,
    endTime: string,
    businessHours: Business_Hour[],
  ): boolean {
    let isValid = false;
    businessHours.forEach((businessHour) => {
      if (
        businessHour.open24Hour ||
        (BaseUtils.isTimeBetween(
          startTime,
          businessHour.open_time,
          businessHour.close_time,
        ) &&
          BaseUtils.isTimeBetween(
            endTime,
            businessHour.open_time,
            businessHour.close_time,
          ))
      ) {
        isValid = true;
      }
    });
    return isValid;
  }

  async instructorDetails(classId: number, id: number): Promise<any> {
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
      instructors['trainedFor'] = serializeCategories(instructors.trainedFor);
      return {
        status: true,
        message: 'Instructor details fetched successfully',
        data: instructors,
      };
    } else {
      throw new NotFoundException('Instructor not found');
    }
  }

  async addToFavourites(userId: number, classId: number): Promise<any> {
    try {
      const favourites = this.favouritesRepository.create();

      const className = await this.classRepository.findOne(classId);
      if (className) {
        favourites.class = className;
      } else {
        throw new NotFoundException('Class not found!');
      }
      favourites.user = await this.userRepository.findOne(userId);
      await favourites.save();
      return {
        status: 200,
        message: 'Class added successfully',
      };
    } catch (e) {
      if (e.message.includes('duplicate key')) {
        throw new ConflictException('Class already added to favourites!');
      }
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getFavourites(
    userId: number,
    queryParams: FavouritesListDto,
  ): Promise<any> {
    const favourites = this.favouritesRepository
      .createQueryBuilder('favourites')
      .select([
        'class.id',
        'class.name',
        'class.photo_thumbnail',
        'class.difficulty',
      ])
      .addSelect('instructor.name')
      .addSelect(
        'sessionSchedule.endTime - sessionSchedule.startTime',
        'duration',
      )
      .addSelect(['sessionSchedule.startTime', 'sessionSchedule.startDate'])
      .innerJoin('favourites.class', 'class')
      .innerJoin('class.sessionSchedule', 'sessionSchedule')
      .leftJoin('class.instructor', 'instructor')
      .where('status= :status and favourites.user = :user', {
        status: ClassStatus.Published,
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

  async removeFromFavourites(userId: number, classId: number): Promise<any> {
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
        throw new BadRequestException('Class not in favourites!');
      }
      return {
        status: 200,
        message: 'Class removed from favourites successfully',
      };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(e.message);
      }
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
