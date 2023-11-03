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
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const instructor_service_1 = require("./instructor.service");
const create_instructor_dto_1 = require("./dto/create-instructor.dto");
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../utils/base.response.dto");
let InstructorController = class InstructorController {
    constructor(instructorService) {
        this.instructorService = instructorService;
    }
    async create(createInstructorDto) {
        return await this.instructorService.create(createInstructorDto);
    }
    async findAll() {
        return await this.instructorService.findAll();
    }
    async findOne(id) {
        return await this.instructorService.findOne(+id);
    }
    async update(id, updateInstructorDto) {
        if (Object.keys(updateInstructorDto).length === 0) {
            throw new common_1.BadRequestException('Please provide the value to be updated!');
        }
        return await this.instructorService.update(id, updateInstructorDto);
    }
    async remove(id) {
        return await this.instructorService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        type: create_instructor_dto_1.CreateInstructorSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_instructor_dto_1.CreateInstructorDto]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        type: create_instructor_dto_1.GetAllInstructorResponseSuccessDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        type: create_instructor_dto_1.CreateInstructorSuccessDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        type: create_instructor_dto_1.UpdateInstructorResponseSuccessDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_instructor_dto_1.UpdateInstructorDto]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "remove", null);
InstructorController = __decorate([
    (0, swagger_1.ApiTags)('Instructor'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({
        type: base_response_dto_1.BaseNotFoundErrorReponse,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: base_response_dto_1.BaseInternalServerErrorReponse,
    }),
    (0, common_1.Controller)('instructor'),
    __metadata("design:paramtypes", [instructor_service_1.InstructorService])
], InstructorController);
exports.InstructorController = InstructorController;
//# sourceMappingURL=instructor.controller.js.map