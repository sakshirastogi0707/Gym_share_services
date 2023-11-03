import { Request } from 'express';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(req: Request, createBookingDto: CreateBookingDto): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/booking.entity").Booking;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBookingDto: UpdateBookingDto): string;
    remove(id: string): string;
}
