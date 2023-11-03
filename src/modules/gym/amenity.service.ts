import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Amenity } from './entities/amenity.entity';
@Injectable()
export class AmenityService {
  constructor(
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}
  async getAllAmenities() {
    const data = await this.amenityRepository.find({
      select: ['id', 'name', 'orderId', 'image', 'isActive'],
      where: {
        isActive: true,
      },
      order: {
        orderId: 'ASC',
        name: 'ASC',
      },
    });
    return data;
  }
}
