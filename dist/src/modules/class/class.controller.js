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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const class_dto_1 = require("./dto/class.dto");
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../utils/base.response.dto");
const instructor_data_dto_1 = require("../gym/dto/instructor-data.dto");
let ClassController = class ClassController {
    constructor(classService) {
        this.classService = classService;
    }
    async getFavourites(query, req) {
        return await this.classService.getFavourites(req['user'].id, query);
    }
    async create(gymId, createClassDto) {
        return await this.classService.create(gymId, createClassDto);
    }
    list(query, req, gymId) {
        return this.classService.findAll(query, gymId);
    }
    listForUsers(query) {
        return this.classService.findClassForUsers(query);
    }
    delete(id) {
        return this.classService.delete(id);
    }
    async getClassDetailsById(classId) {
        return await this.classService.getClassDetailsById(classId);
    }
    async updateClassDetailsById(gymId, classId, updateClassDataDto) {
        if (!updateClassDataDto || Object.keys(updateClassDataDto).length === 0) {
            throw new common_1.BadRequestException('Request body cannot be empty!');
        }
        return await this.classService.updateClassDetailsById(gymId, classId, updateClassDataDto);
    }
    async getGymInstructors(instructorId, classId) {
        return this.classService.instructorDetails(classId, instructorId);
    }
    async addToFavourites(classId, req) {
        return await this.classService.addToFavourites(req['user'].id, classId);
    }
    async deleteFavourites(classId, req) {
        return await this.classService.removeFromFavourites(req['user'].id, classId);
    }
};
__decorate([
    (0, common_1.Get)('/favourites'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiOkResponse)({
        type: class_dto_1.FavouritesListResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.FavouritesListDto, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getFavourites", null);
__decorate([
    (0, common_1.Post)(':gymId'),
    (0, swagger_1.ApiCreatedResponse)({
        type: class_dto_1.CreateClassSuccessDto,
    }),
    __param(0, (0, common_1.Param)('gymId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, class_dto_1.ClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/list/:gymId'),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('gymId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.ClassListRequestParamsDto, Object, String]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/list-for-users'),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.ClassListSortRequestParamsDto]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "listForUsers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        type: class_dto_1.CreateClassSuccessDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassDetailsById", null);
__decorate([
    (0, common_1.Patch)(':gymId/:classId'),
    (0, swagger_1.ApiCreatedResponse)({
        type: class_dto_1.UpdateClassSuccessResponseDto,
    }),
    __param(0, (0, common_1.Param)('gymId')),
    __param(1, (0, common_1.Param)('classId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, class_dto_1.UpdateClassDataDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "updateClassDetailsById", null);
__decorate([
    (0, common_1.Get)('/class/:classId/instructors/:instructorId'),
    (0, swagger_1.ApiOkResponse)({
        type: instructor_data_dto_1.InstructorDataDto,
    }),
    __param(0, (0, common_1.Param)('instructorId')),
    __param(1, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getGymInstructors", null);
__decorate([
    (0, common_1.Post)('/:classId/favourites'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "addToFavourites", null);
__decorate([
    (0, common_1.Delete)('/:classId/favourites'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "deleteFavourites", null);
ClassController = __decorate([
    (0, swagger_1.ApiTags)('Class'),
    (0, common_1.Controller)('class'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
exports.ClassController = ClassController;
//# sourceMappingURL=class.controller.js.map