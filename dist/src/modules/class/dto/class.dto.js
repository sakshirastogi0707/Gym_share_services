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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesListResponseDto = exports.FavouriteClassDto = exports.FavouritesListDto = exports.ClassListSortRequestParamsDto = exports.ClassListRequestParamsDto = exports.UpdateClassSuccessResponseDto = exports.UpdateClassDataDto = exports.ListClassSuccessDto = exports.CreateClassSuccessDto = exports.ClassResponseDto = exports.ClassDto = exports.UpdateAboutClass = exports.AboutClass = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const add_ons_data_dto_1 = require("./add-ons-data.dto");
const session_schedule_dto_1 = require("./session-schedule.dto");
const base_response_dto_1 = require("../../../utils/base.response.dto");
const class_enum_1 = require("../../../enums/class.enum");
const base_utils_1 = require("../../../utils/base.utils");
const class_transformer_1 = require("class-transformer");
const pricing_dto_1 = require("./pricing.dto");
const base_list_dto_1 = require("../../../utils/dtos/base.list.dto");
const base_list_sort_dto_1 = require("../../../utils/dtos/base.list.sort.dto");
class AboutClass {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'lorem ipsum',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], AboutClass.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '250',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AboutClass.prototype, "estimated_calorie_burn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'core,thigh',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    __metadata("design:type", String)
], AboutClass.prototype, "targeted_body_parts", void 0);
exports.AboutClass = AboutClass;
class UpdateAboutClass {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'lorem ipsum',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateAboutClass.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '250',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAboutClass.prototype, "estimated_calorie_burn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'core,thigh',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    __metadata("design:type", String)
], UpdateAboutClass.prototype, "targeted_body_parts", void 0);
exports.UpdateAboutClass = UpdateAboutClass;
class ClassDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class Name',
        example: 'Yoga Class',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Spots',
        example: 40,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ClassDto.prototype, "spots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'About Class',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    __metadata("design:type", AboutClass)
], ClassDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'About Class',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    __metadata("design:type", pricing_dto_1.PricingData)
], ClassDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Add Ons',
        type: () => [add_ons_data_dto_1.AddOnsDataModel],
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    __metadata("design:type", Array)
], ClassDto.prototype, "addOns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Difficulty',
        example: `${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.Difficulty).join('/')}`,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(base_utils_1.BaseUtils.getEnumKeys(class_enum_1.Difficulty), {
        message: `Diffculty can only be ${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.Difficulty)}`,
    }),
    __metadata("design:type", String)
], ClassDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Equipments Required',
        example: 'Bring your own towels',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "equipmentsRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Photo Thumbnail',
        example: 'Photo://thumb',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "photoThumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Photo Cover',
        example: 'Photo://cover',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "photoCover", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor ID',
        example: 1,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ClassDto.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fitness Category ID',
        example: 1,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ClassDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fitness Sub Category ID',
        example: [1, 2],
        isArray: true,
        type: [Number],
    }),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ClassDto.prototype, "subCategories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session Schedule',
        type: () => session_schedule_dto_1.SessionScheduleDto,
    }),
    (0, class_transformer_1.Type)(() => session_schedule_dto_1.SessionScheduleDto),
    (0, class_validator_1.ValidateIf)((o) => o.status === class_enum_1.ClassStatus[class_enum_1.ClassStatus.Published]),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", session_schedule_dto_1.SessionScheduleDto)
], ClassDto.prototype, "sessionSchedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status',
        example: base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassStatus).join('/'),
    }),
    (0, class_validator_1.IsIn)(base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassStatus), {
        message: `Status can only be ${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassStatus)}`,
    }),
    __metadata("design:type", String)
], ClassDto.prototype, "status", void 0);
exports.ClassDto = ClassDto;
class ClassResponseDto extends ClassDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassResponseDto.prototype, "id", void 0);
exports.ClassResponseDto = ClassResponseDto;
class CreateClassSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ClassResponseDto)
], CreateClassSuccessDto.prototype, "data", void 0);
exports.CreateClassSuccessDto = CreateClassSuccessDto;
class ListClassSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [ClassResponseDto],
    }),
    __metadata("design:type", Array)
], ListClassSuccessDto.prototype, "data", void 0);
exports.ListClassSuccessDto = ListClassSuccessDto;
class UpdateClassDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class Name',
        example: 'Yoga Class',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClassDataDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Spots',
        example: 40,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateClassDataDto.prototype, "spots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'About Class',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", UpdateAboutClass)
], UpdateClassDataDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pricing',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", pricing_dto_1.PricingData)
], UpdateClassDataDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Equipments Required',
        example: 'Bring your own towels',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClassDataDto.prototype, "equipmentsRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor ID',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateClassDataDto.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session Schedule',
        type: () => session_schedule_dto_1.UpdateSessionScheduleDto,
    }),
    (0, class_transformer_1.Type)(() => session_schedule_dto_1.UpdateSessionScheduleDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", session_schedule_dto_1.UpdateSessionScheduleDto)
], UpdateClassDataDto.prototype, "sessionSchedule", void 0);
exports.UpdateClassDataDto = UpdateClassDataDto;
class UpdateClassSuccessResponseDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [UpdateClassDataDto],
    }),
    __metadata("design:type", Array)
], UpdateClassSuccessResponseDto.prototype, "data", void 0);
exports.UpdateClassSuccessResponseDto = UpdateClassSuccessResponseDto;
class ClassListRequestParamsDto extends base_list_dto_1.BaseListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListRequestParamsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: `${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassStatus).join('/')}`,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassStatus), {
        message: `Status can only be ${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassStatus)}`,
    }),
    __metadata("design:type", String)
], ClassListRequestParamsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '18:00',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListRequestParamsDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '19:00',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListRequestParamsDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: [1, 2],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClassListRequestParamsDto.prototype, "categoryIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2022-11-11',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListRequestParamsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2022-12-11',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListRequestParamsDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: [1, 2],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClassListRequestParamsDto.prototype, "trainerIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Beginner',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListRequestParamsDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListRequestParamsDto.prototype, "priceMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListRequestParamsDto.prototype, "priceMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListRequestParamsDto.prototype, "slotsMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 250,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListRequestParamsDto.prototype, "slotsMax", void 0);
exports.ClassListRequestParamsDto = ClassListRequestParamsDto;
class ClassListSortRequestParamsDto extends base_list_sort_dto_1.BaseListSortDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListSortRequestParamsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '18:00',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListSortRequestParamsDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '19:00',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListSortRequestParamsDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: [1, 2],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClassListSortRequestParamsDto.prototype, "categoryIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2022-11-11',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListSortRequestParamsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2022-12-11',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListSortRequestParamsDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: [1, 2],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClassListSortRequestParamsDto.prototype, "trainerIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Beginner',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassListSortRequestParamsDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListSortRequestParamsDto.prototype, "priceMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListSortRequestParamsDto.prototype, "priceMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListSortRequestParamsDto.prototype, "slotsMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 250,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ClassListSortRequestParamsDto.prototype, "slotsMax", void 0);
exports.ClassListSortRequestParamsDto = ClassListSortRequestParamsDto;
class FavouritesListDto extends base_list_dto_1.BaseListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FavouritesListDto.prototype, "name", void 0);
exports.FavouritesListDto = FavouritesListDto;
class FavouriteClassDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], FavouriteClassDto.prototype, "class_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Yoga',
    }),
    __metadata("design:type", String)
], FavouriteClassDto.prototype, "class_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Experienced',
    }),
    __metadata("design:type", String)
], FavouriteClassDto.prototype, "class_difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2012-11-10T18:30:00.000Z',
    }),
    __metadata("design:type", String)
], FavouriteClassDto.prototype, "sessionSchedule_start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '18:30:00',
    }),
    __metadata("design:type", String)
], FavouriteClassDto.prototype, "sessionSchedule_start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John',
    }),
    __metadata("design:type", String)
], FavouriteClassDto.prototype, "instructor_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'string',
    }),
    __metadata("design:type", String)
], FavouriteClassDto.prototype, "photo_thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            hours: 1,
        },
    }),
    __metadata("design:type", Object)
], FavouriteClassDto.prototype, "duration", void 0);
exports.FavouriteClassDto = FavouriteClassDto;
class FavPaginated {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [FavouriteClassDto],
    }),
    __metadata("design:type", Array)
], FavPaginated.prototype, "classes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], FavPaginated.prototype, "count", void 0);
class FavouritesListResponseDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", FavPaginated)
], FavouritesListResponseDto.prototype, "data", void 0);
exports.FavouritesListResponseDto = FavouritesListResponseDto;
//# sourceMappingURL=class.dto.js.map