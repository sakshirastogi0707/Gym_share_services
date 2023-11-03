import { Repository } from 'typeorm/repository/Repository';
import { Amenity } from './entities/amenity.entity';
export declare class AmenityService {
    private amenityRepository;
    constructor(amenityRepository: Repository<Amenity>);
    getAllAmenities(): Promise<Amenity[]>;
}
