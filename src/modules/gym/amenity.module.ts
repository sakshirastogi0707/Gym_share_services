import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Amenity } from './entities/amenity.entity';
import { AmenityService } from './amenity.service';
import { AmenityController } from './amenity.controller';

@Module({
  exports: [AmenityService],
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Amenity])],
  controllers: [AmenityController],
  providers: [AmenityService],
})
export class AmenityModule {}
