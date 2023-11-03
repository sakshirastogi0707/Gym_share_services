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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const booking_entity_1 = require("./entities/booking.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const class_entity_1 = require("../class/entities/class.entity");
const user_entity_1 = require("../user/entity/user.entity");
const session_entity_1 = require("../class/entities/session.entity");
const booking_enum_1 = require("../../enums/booking.enum");
let BookingService = class BookingService {
    constructor(bookingRepository, classRepo, userRepository, sessionRepo) {
        this.bookingRepository = bookingRepository;
        this.classRepo = classRepo;
        this.userRepository = userRepository;
        this.sessionRepo = sessionRepo;
    }
    async create(createBookingDto, user) {
        try {
            const { sessions, bookingFor } = createBookingDto;
            const classData = await this.classRepo.findOne(createBookingDto.class);
            if (!classData) {
                throw new common_1.BadRequestException('Incorrect Class ID!');
            }
            let sessionsData = [];
            if (bookingFor === booking_enum_1.BookingFor[booking_enum_1.BookingFor.FullPackage]) {
                sessionsData = await this.sessionRepo.find({
                    where: {
                        class: createBookingDto.class,
                    },
                });
            }
            else if (bookingFor === booking_enum_1.BookingFor[booking_enum_1.BookingFor.SingleSession]) {
                sessionsData = await this.sessionRepo.find({
                    where: [{ id: sessions[0], class: createBookingDto.class }],
                });
            }
            else if (bookingFor === booking_enum_1.BookingFor[booking_enum_1.BookingFor.Monthly]) {
                for (const session of sessions) {
                    const sessionModel = await this.sessionRepo.findOne({
                        where: {
                            class: createBookingDto.class,
                            id: session,
                        },
                    });
                    if (!sessionModel) {
                        throw new common_1.BadRequestException('Session not found!');
                    }
                    sessionsData.push(sessionModel);
                }
            }
            if (!sessionsData || sessionsData.length == 0) {
                throw new common_1.BadRequestException('Session not found!');
            }
            sessionsData.forEach((session) => {
                if (session.totalSeats <= session.seatsFilled) {
                    throw new common_1.BadRequestException('Seat not available in session!');
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
                await this.sessionRepo.update({ id: session.id }, { seatsFilled: session.seatsFilled + 1 });
            });
            return {
                status: true,
                message: 'Booking added successfully',
                data: bookingData,
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(e.message);
            }
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
    findAll() {
        return `This action returns all booking`;
    }
    findOne(id) {
        return `This action returns a #${id} booking`;
    }
    update(id, updateBookingDto) {
        return `This action updates a #${id} booking` + updateBookingDto;
    }
    remove(id) {
        return `This action removes a #${id} booking`;
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_2.InjectRepository)(class_entity_1.Class)),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_2.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map