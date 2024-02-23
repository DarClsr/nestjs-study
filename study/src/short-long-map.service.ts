import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ShortLongMap } from './entities/shortLongMap.entity';
import { UniqueCode } from './entities/uniqueCode.entity';
import { UniqueCodeService } from './unique-code/unique-code.service';

@Injectable()
export class ShortLongMapService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(UniqueCodeService)
  private uniqueCodeService: UniqueCodeService;

  async generate(longUrl: string) {
    let unique_code = await this.entityManager.findOneBy(UniqueCode, {
      status: 0,
    });

    if (!unique_code) {
        unique_code = await this.uniqueCodeService.generateCode();
    }

    const map = new ShortLongMap();
    map.shortUrl = unique_code.code;
    map.longUrl = longUrl;

    await this.entityManager.save(ShortLongMap,map);

    await this.entityManager.update(UniqueCode,{
        id:unique_code.id
    },{
        status:1
    })

    return unique_code.code;
  }

  async getLongUrl(code:string){
    const map=await this.entityManager.findOneBy(ShortLongMap,{
      shortUrl:code
    })
    if(!map) {
      return null;
  }

    return map.longUrl;
  }
}
