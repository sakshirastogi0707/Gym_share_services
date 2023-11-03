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
exports.InstructorService = void 0;
const common_1 = require("@nestjs/common");
const create_instructor_dto_1 = require("./dto/create-instructor.dto");
const typeorm_1 = require("@nestjs/typeorm");
const instructor_entity_1 = require("./entities/instructor.entity");
const typeorm_2 = require("typeorm");
const certificate_entity_1 = require("./entities/certificate.entity");
const trained_for_entity_1 = require("./entities/trained_for.entity");
const gym_entity_1 = require("../gym/entities/gym.entity");
const transformUserData_utils_1 = require("../../utils/transformUserData.utils");
const fitness_subcategory_entity_1 = require("../user/entity/fitness.subcategory.entity");
const fitness_category_entity_1 = require("../user/entity/fitness.category.entity");
let InstructorService = class InstructorService {
    constructor(instructorRepository, certificateRepository, tarinedForRepository, gymRepository, categoryRepo, subcategoryRepo) {
        this.instructorRepository = instructorRepository;
        this.certificateRepository = certificateRepository;
        this.tarinedForRepository = tarinedForRepository;
        this.gymRepository = gymRepository;
        this.categoryRepo = categoryRepo;
        this.subcategoryRepo = subcategoryRepo;
    }
    async create(createInstructorDto) {
        var _a, _b, _c, _d, _e, _f;
        const { gymId } = createInstructorDto;
        const gym = await this.gymRepository.findOne({
            where: { id: gymId },
            relations: ['instructors'],
        });
        if (!gym) {
            throw new common_1.NotFoundException('Gym not found!');
        }
        await this.validateInstructorCategory(createInstructorDto);
        try {
            const instructors = this.instructorRepository.create();
            instructors.name = (_a = createInstructorDto.name) !== null && _a !== void 0 ? _a : null;
            instructors.photo = (_b = createInstructorDto.photo) !== null && _b !== void 0 ? _b : null;
            instructors.about = (_c = createInstructorDto.about) !== null && _c !== void 0 ? _c : null;
            instructors.expYears = (_d = createInstructorDto.expYears) !== null && _d !== void 0 ? _d : null;
            instructors.expMonths = (_e = createInstructorDto.expMonths) !== null && _e !== void 0 ? _e : null;
            instructors.dob = (_f = createInstructorDto.dob) !== null && _f !== void 0 ? _f : null;
            instructors.gym = gym;
            const savedInstructor = await this.instructorRepository.save(instructors);
            const certificates = createInstructorDto.certificates.map((certificate, index) => {
                const certificateModel = new certificate_entity_1.Certificate();
                certificateModel.orderId = index + 1;
                certificateModel.name = certificate.name;
                certificateModel.pdfFile = certificate.pdfFile;
                certificateModel.instructor = savedInstructor.id;
                return certificateModel;
            });
            await this.certificateRepository.save(certificates);
            const instructorTrainedForObjs = [];
            for (const trainedFor of createInstructorDto.trainedFor) {
                if (trainedFor.subCategoryIds.length > 0) {
                    for (const subCategoryId of trainedFor.subCategoryIds) {
                        const trainedForModel = new trained_for_entity_1.InstructorTrainedFor();
                        trainedForModel.instructorId = savedInstructor.id;
                        trainedForModel.categoryId = trainedFor.categoryId;
                        trainedForModel.subCategoryId = subCategoryId;
                        instructorTrainedForObjs.push(trainedForModel);
                    }
                }
                else {
                    const trainedForModel = new trained_for_entity_1.InstructorTrainedFor();
                    trainedForModel.instructorId = savedInstructor.id;
                    trainedForModel.categoryId = trainedFor.categoryId;
                    instructorTrainedForObjs.push(trainedForModel);
                }
            }
            let trainedFor = await this.tarinedForRepository.save(instructorTrainedForObjs);
            trainedFor = await this.tarinedForRepository.find({
                where: { instructorId: savedInstructor.id },
                relations: ['category', 'subcategory'],
            });
            trainedFor = (0, transformUserData_utils_1.serializeCategories)(trainedFor);
            const data = Object.assign(Object.assign({}, createInstructorDto), { trainedFor });
            return {
                status: true,
                message: 'Instructor added successfully',
                data,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error.code && error.code == 23503) {
                throw new common_1.BadRequestException(`Incorrect category or subcategory!`);
            }
            throw new common_1.InternalServerErrorException('something went wrong');
        }
    }
    async validateInstructorCategory(createInstructorDto) {
        for (const trainedFor of createInstructorDto.trainedFor) {
            if (trainedFor.subCategoryIds.length > 0) {
                for (const subCategoryId of trainedFor.subCategoryIds) {
                    const subCategoryData = await this.subcategoryRepo.findOne({
                        where: {
                            id: subCategoryId,
                            category: trainedFor.categoryId,
                        },
                        select: ['category', 'id', 'description'],
                    });
                    if (!subCategoryData) {
                        throw new common_1.BadRequestException('Fitness category and subcategories are not associated');
                    }
                }
            }
            else {
                const categoryData = await this.categoryRepo.findOne({
                    where: {
                        id: trainedFor.categoryId,
                    },
                });
                if (!categoryData) {
                    throw new common_1.BadRequestException('Fitness category not found!');
                }
            }
        }
    }
    findAll() {
        return this.instructorRepository.find({
            where: {
                active: true,
            },
            order: {
                name: 'ASC',
            },
        });
    }
    async findOne(id) {
        const instructorData = await this.instructorRepository
            .findOne({
            where: {
                id: id,
            },
            relations: ['certificates'],
        })
            .catch((err) => {
            throw new common_1.BadRequestException(err.message);
        });
        if (!instructorData) {
            return {
                status: false,
                message: 'Instructor not found',
            };
        }
        else {
            const trained_for = await this.tarinedForRepository.find({
                where: { instructorId: id },
                relations: ['category', 'subcategory'],
            });
            const data = Object.assign(Object.assign({}, instructorData), { trainedFor: (0, transformUserData_utils_1.serializeCategories)(trained_for) });
            return {
                status: true,
                message: 'Instructor fatched successfully',
                data,
            };
        }
    }
    async update(id, updateInstructorDto) {
        const findInstructorRes = await this.instructorRepository.findOne({
            where: [{ id: id }],
        });
        if (!findInstructorRes) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Instructor not found',
            });
        }
        const updatedFields = Object.assign(Object.assign({}, create_instructor_dto_1.UpdateInstructorDto), { modifiedAt: new Date() });
        if (updateInstructorDto.name !== undefined) {
            updatedFields.name = updateInstructorDto.name;
        }
        if (updateInstructorDto.photo !== undefined) {
            updatedFields.photo = updateInstructorDto.photo;
        }
        if (updateInstructorDto.about !== undefined) {
            updatedFields.about = updateInstructorDto.about;
        }
        if (updateInstructorDto.expYears !== undefined) {
            updatedFields.expYears = updateInstructorDto.expYears;
        }
        if (updateInstructorDto.expMonths !== undefined) {
            updatedFields.expMonths = updateInstructorDto.expMonths;
        }
        if (updateInstructorDto.dob !== undefined) {
            updatedFields.dob = updateInstructorDto.dob;
        }
        if (updateInstructorDto.trainedFor !== undefined) {
            await this.tarinedForRepository.delete({ instructorId: id });
            const instructorTrainedForObjs = [];
            for (const trainedFor of updateInstructorDto.trainedFor) {
                if (trainedFor.subCategoryIds.length > 0) {
                    for (const subCategoryId of trainedFor.subCategoryIds) {
                        const trainedForModel = new trained_for_entity_1.InstructorTrainedFor();
                        trainedForModel.instructorId = id;
                        trainedForModel.categoryId = trainedFor.categoryId;
                        trainedForModel.subCategoryId = subCategoryId;
                        instructorTrainedForObjs.push(trainedForModel);
                    }
                }
                else {
                    const trainedForModel = new trained_for_entity_1.InstructorTrainedFor();
                    trainedForModel.instructorId = id;
                    trainedForModel.categoryId = trainedFor.categoryId;
                    instructorTrainedForObjs.push(trainedForModel);
                }
            }
            await this.tarinedForRepository.save(instructorTrainedForObjs);
        }
        if (updateInstructorDto.certificates !== undefined) {
            await this.certificateRepository.delete({
                instructor: findInstructorRes,
            });
            const certificates = updateInstructorDto.certificates.map((certificate, index) => {
                const certificateModel = new certificate_entity_1.Certificate();
                certificateModel.orderId = index + 1;
                certificateModel.name = certificate.name;
                certificateModel.pdfFile = certificate.pdfFile;
                certificateModel.instructor = findInstructorRes;
                return certificateModel;
            });
            await this.certificateRepository.save(certificates);
        }
        const updateInstructorRes = await this.instructorRepository.update({
            id: findInstructorRes.id,
        }, updatedFields);
        const isUpdated = updateInstructorRes.hasOwnProperty('affected');
        if (!isUpdated || updateInstructorRes.affected === 0) {
            throw new common_1.ForbiddenException({
                status: true,
                message: 'Failed to update instructor profile',
            });
        }
        const updatedInstructor = await this.instructorRepository.findOne({
            where: [{ id: findInstructorRes.id }],
            relations: ['certificates'],
        });
        let trainedFor = await this.tarinedForRepository.find({
            where: { instructorId: id },
            relations: ['category', 'subcategory'],
        });
        trainedFor = (0, transformUserData_utils_1.serializeCategories)(trainedFor);
        return {
            status: true,
            message: 'Instructor profile updated successfully',
            data: Object.assign(Object.assign({}, updatedInstructor), { trainedFor }),
        };
    }
    async remove(id) {
        const instructor = await this.instructorRepository.findOne({
            where: [{ id: id }],
        });
        if (!instructor) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'Instructor not found',
            });
        }
        const updatedData = await this.instructorRepository
            .update({ id: instructor.id }, {
            active: false,
        })
            .catch((err) => {
            throw new common_1.BadRequestException(err.message);
        });
        if (updatedData.affected == 1) {
            return {
                status: true,
                message: 'Instructor removed successfully',
            };
        }
        else {
            return {
                status: false,
                message: 'Unable to remove instructor',
            };
        }
    }
};
InstructorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(instructor_entity_1.Instructor)),
    __param(1, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __param(2, (0, typeorm_1.InjectRepository)(trained_for_entity_1.InstructorTrainedFor)),
    __param(3, (0, typeorm_1.InjectRepository)(gym_entity_1.Gym)),
    __param(4, (0, typeorm_1.InjectRepository)(fitness_category_entity_1.FitnessCategory)),
    __param(5, (0, typeorm_1.InjectRepository)(fitness_subcategory_entity_1.FitnessSubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InstructorService);
exports.InstructorService = InstructorService;
//# sourceMappingURL=instructor.service.js.map