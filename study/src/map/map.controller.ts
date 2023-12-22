import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { RedisService } from 'src/redis/redis.service';

@Controller('map')
export class MapController {
  @Inject(RedisService)
  private redisService: RedisService;

  @Get('add')
  async addMap(
    @Query('name') posName: string,
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
  ) {
    if (!posName || !longitude || !latitude) {
      throw new BadRequestException('位置信息不全');
    }

    try {
      await this.redisService.geoAdd('positions', posName, [
        longitude,
        latitude,
      ]);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return {
      message: 'success',
      code: 200,
    };
  }
  @Get('allpos')
  async getAllGeo() {
    return await this.redisService.getAllGeos('positions');
  }

  @Get('pos')
  async getPos(@Query('name') name) {
    return await this.redisService.getPos('positions', name);
  }

  @Get('nearBySearch')
  async search(
    @Query('radius') radius: number,
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
  ) {
    if (!longitude || !latitude) {
      throw new BadRequestException('缺少位置信息');
    }
    if (!radius) {
      throw new BadRequestException('缺少搜索半径');
    }

    return this.redisService.geoSearch(
      'positions',
      [longitude, latitude],
      radius,
    );
  }
}
