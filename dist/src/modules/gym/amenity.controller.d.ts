import { AmenityService } from './amenity.service';
export declare class AmenityController {
    private readonly amenityService;
    constructor(amenityService: AmenityService);
    findAll(): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/amenity.entity").Amenity[];
    }>;
}
