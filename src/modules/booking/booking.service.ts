import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from '../class/entities/class.entity';
import { User } from '../user/entity/user.entity';
import { Session } from '../class/entities/session.entity';
import { BookingFor } from 'src/enums/booking.enum';
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Class)
    private classRepo: Repository<Class>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
  ) {}
  async create(createBookingDto: CreateBookingDto, user: User) {
    try {
      const { sessions, bookingFor } = createBookingDto;
      const classData = await this.classRepo.findOne(createBookingDto.class);
      if (!classData) {
        throw new BadRequestException('Incorrect Class ID!');
      }
      let sessionsData = [];
      if (bookingFor === BookingFor[BookingFor.FullPackage]) {
        sessionsData = await this.sessionRepo.find({
          where: {
            class: createBookingDto.class,
          },
        });
      } else if (bookingFor === BookingFor[BookingFor.SingleSession]) {
        sessionsData = await this.sessionRepo.find({
          where: [{ id: sessions[0], class: createBookingDto.class }],
        });
      } else if (bookingFor === BookingFor[BookingFor.Monthly]) {
        for (const session of sessions) {
          const sessionModel = await this.sessionRepo.findOne({
            where: {
              class: createBookingDto.class,
              id: session,
            },
          });
          if (!sessionModel) {
            throw new BadRequestException('Session not found!');
          }
          sessionsData.push(sessionModel);
        }
      }

      if (!sessionsData || sessionsData.length == 0) {
        throw new BadRequestException('Session not found!');
      }
      sessionsData.forEach((session) => {
        if (session.totalSeats <= session.seatsFilled) {
          throw new BadRequestException('Seat not available in session!');
        }
      });

      const bookingData = this.bookingRepository.create();
      bookingData.user = user;
      bookingData.class = classData;
      bookingData.sessions = sessionsData;
      bookingData.bookingFor = createBookingDto.bookingFor;
      bookingData.isForSomeoneElse = createBookingDto.isForSomeoneElse;
      bookingData.someoneElse = createBookingDto.someoneElse;
      bookingData.addOns = createBookingDto.addOns;
      await bookingData.save();
      sessionsData.forEach(async (session) => {
        await this.sessionRepo.update(
          { id: session.id },
          { seatsFilled: session.seatsFilled + 1 },
        );
      });
      return {
        status: true,
        message: 'Booking added successfully',
        data: bookingData,
      };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking` + updateBookingDto;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
