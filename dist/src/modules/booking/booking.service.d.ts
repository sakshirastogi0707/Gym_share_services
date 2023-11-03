import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Class } from '../class/entities/class.entity';
import { User } from '../user/entity/user.entity';
import { Session } from '../class/entities/session.entity';
export declare class BookingService {
    private bookingRepository;
    private classRepo;
    private userRepository;
    private sessionRepo;
    constructor(bookingRepository: Repository<Booking>, classRepo: Repository<Class>, userRepository: Repository<User>, sessionRepo: Repository<Session>);
    create(createBookingDto: CreateBookingDto, user: User): Promise<{
        status: boolean;
        message: string;
        data: Booking;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBookingDto: UpdateBookingDto): string;
    remove(id: number): string;
}
