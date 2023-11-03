import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponListRequestParamsDto } from './dto/coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async createCoupon(createCouponDto: CreateCouponDto) {
    // Create a new coupon entity with the converted date values
    const couponToSave = this.couponRepository.create({
      ...createCouponDto,
    });

    const savedCoupon = await this.couponRepository.save(couponToSave);

    return savedCoupon;
  }

  async getCoupons(queryParams: CouponListRequestParamsDto) {
    const query = this.couponRepository
      .createQueryBuilder('coupon')
      .select([
        'coupon.id',
        'coupon.name',
        'coupon.description',
        'coupon.code',
        'coupon.isExpired',
        'coupon.expirationDate',
        'coupon.startingDate',
        'coupon.isActive',
        'coupon.maxUsage',
        'coupon.discount',
      ])
      .where('coupon.isActive = :isActive', { isActive: true });

    if (queryParams.name) {
      query.where('coupon.name like :name', {
        name: `%${queryParams.name}%`,
      });
    }

    if (queryParams.expirationDateStart && queryParams.expirationDateEnd) {
      query.andWhere(
        'coupon.expirationDate BETWEEN :expirationDateStart AND :expirationDateEnd',
        {
          expirationDateStart: queryParams.expirationDateStart,
          expirationDateEnd: queryParams.expirationDateEnd,
        },
      );
    }

    if (
      queryParams.maxUsageMin !== undefined ||
      queryParams.maxUsageMax !== undefined
    ) {
      if (
        queryParams.maxUsageMin !== undefined &&
        queryParams.maxUsageMax !== undefined
      ) {
        query.andWhere(
          'coupon.maxUsage BETWEEN :maxUsageMin AND :maxUsageMax',
          {
            maxUsageMin: queryParams.maxUsageMin,
            maxUsageMax: queryParams.maxUsageMax,
          },
        );
      } else if (queryParams.maxUsageMin !== undefined) {
        query.andWhere('coupon.maxUsage >= :maxUsageMin', {
          maxUsageMin: queryParams.maxUsageMin,
        });
      } else if (queryParams.maxUsageMax !== undefined) {
        query.andWhere('coupon.maxUsage <= :maxUsageMax', {
          maxUsageMax: queryParams.maxUsageMax,
        });
      }
    }

    if (
      queryParams.discountMin !== undefined ||
      queryParams.discountMax !== undefined
    ) {
      if (
        queryParams.discountMin !== undefined &&
        queryParams.discountMax !== undefined
      ) {
        query.andWhere(
          'coupon.discount BETWEEN :discountMin AND :discountMax',
          {
            discountMin: queryParams.discountMin,
            discountMax: queryParams.discountMax,
          },
        );
      } else if (queryParams.discountMin !== undefined) {
        query.andWhere('coupon.discount >= :discountMin', {
          discountMin: queryParams.discountMin,
        });
      } else if (queryParams.discountMax !== undefined) {
        query.andWhere('coupon.discount <= :discountMax', {
          discountMax: queryParams.discountMax,
        });
      }
    }

    if (queryParams.code) {
      query.andWhere('coupon.code like :code', {
        code: `%${queryParams.code}%`,
      });
    }

    if (queryParams.isExpired !== undefined) {
      query.andWhere('coupon.isExpired = :isExpired', {
        isExpired: queryParams.isExpired,
      });
    }

    if (queryParams.page && queryParams.pageSize) {
      const count = await query.getCount();

      query.skip((queryParams.page - 1) * queryParams.pageSize);
      query.take(queryParams.pageSize);

      const coupons = await query.getMany();

      return {
        status: true,
        message: 'Coupons fetched successfully',
        data: { coupons, numberOfRecords: count },
      };
    } else {
      const coupons = await query.getMany();

      return {
        status: true,
        message: 'Coupons fetched successfully',
        data: { coupons },
      };
    }
  }

  async getCoupon(id: number) {
    const coupon = await this.couponRepository.findOne(id, {
      where: {
        isActive: true,
      },
      select: [
        'id',
        'name',
        'description',
        'code',
        'isExpired',
        'isActive',
        'expirationDate',
        'startingDate',
        'maxUsage',
        'discount',
      ],
    });
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found `);
    }

    return coupon;
  }

  async updateCouponById(id: number, updateCouponDto: UpdateCouponDto) {
    try {
      const coupon = await this.couponRepository.findOne(id);

      if (!coupon) {
        throw new NotFoundException(`Coupon with id ${id} not found.`);
      }

      // Check if the 'code' field is present in the updateCouponDto
      if (updateCouponDto.code !== undefined) {
        throw new BadRequestException(`Cannot update the 'code' field.`);
      }

      // Update the coupon entity with the provided DTO values
      const updatedCoupon = {
        ...coupon, // Spread the existing coupon values
        ...updateCouponDto, // Spread the updated values from the DTO
        modifiedAt: new Date(), // Set modifiedAt to the current timestamp
      };

      await this.couponRepository.save(updatedCoupon);

      return {
        status: 200,
        message: 'Coupon updated successfully!',
        data: updatedCoupon,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteCouponById(id: number) {
    try {
      const coupon = await this.couponRepository.findOne(id, {
        where: {
          isActive: true,
        },
      });

      if (!coupon) {
        throw new NotFoundException(`Coupon not found.`);
      }

      coupon.isActive = false;
      coupon.modifiedAt = new Date();

      await this.couponRepository.save(coupon);

      return {
        status: 200,
        message: 'Coupon deleted successfully!',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message, error.getResponse());
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
