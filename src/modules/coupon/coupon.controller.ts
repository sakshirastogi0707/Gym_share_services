import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { CouponListRequestParamsDto } from './dto/coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@ApiTags('coupon')
@ApiBearerAuth()
@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post()
  createCoupon(@Body() dto: CreateCouponDto) {
    return this.couponService.createCoupon(dto);
  }

  @Get()
  getCoupons(@Query() queryParams: CouponListRequestParamsDto) {
    return this.couponService.getCoupons(queryParams);
  }

  // Exclude this endpoint from Swagger documentation
  @ApiExcludeEndpoint()
  @Get('/user')
  getUserCoupons(@Query() queryParams: CouponListRequestParamsDto) {
    return this.couponService.getCoupons(queryParams);
  }

  @Get(':id')
  getCouponById(@Param('id') id: number) {
    return this.couponService.getCoupon(id);
  }

  @Patch(':id')
  updateCouponById(@Param('id') id: number, @Body() dto: UpdateCouponDto) {
    return this.couponService.updateCouponById(id, dto);
  }

  @Delete(':id')
  deleteCouponById(@Param('id') id: number) {
    return this.couponService.deleteCouponById(id);
  }
}
