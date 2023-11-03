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
exports.GymMiddleware = void 0;
const common_1 = require("@nestjs/common");
const gym_service_1 = require("../modules/gym/gym.service");
let GymMiddleware = class GymMiddleware {
    constructor(gymService) {
        this.gymService = gymService;
    }
    async use(req, res, next) {
        if (!req.params['id']) {
            next();
        }
        try {
            const gym = await this.gymService.gymExists(parseInt(req.params['id']));
            if (gym.user.id !== req['user'].id) {
                throw new common_1.ForbiddenException("You don't have access to this gym");
            }
            next();
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            if (error instanceof common_1.ForbiddenException) {
                throw new common_1.ForbiddenException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
GymMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(gym_service_1.GymService)),
    __metadata("design:paramtypes", [gym_service_1.GymService])
], GymMiddleware);
exports.GymMiddleware = GymMiddleware;
//# sourceMappingURL=gym.middleware.js.map