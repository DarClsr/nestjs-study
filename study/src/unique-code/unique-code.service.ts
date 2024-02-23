import { Injectable } from '@nestjs/common';
import { Cron,CronExpression } from '@nestjs/schedule';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UniqueCode } from 'src/entities/uniqueCode.entity';
import { generateRandomStr } from 'src/utils';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UniqueCodeService {
    @InjectEntityManager()
    private manager: EntityManager;


   @Cron(CronExpression.EVERY_DAY_AT_4AM)
    async generateCode(){
        const str=generateRandomStr(6)
        const unique_code=await this.manager.findOneBy(UniqueCode,{
            code:str
        });

        if(!unique_code){
            const code=new UniqueCode();
            code.code=str;
            code.status=0;
            return await this.manager.save(UniqueCode,code)
        }else {
            return this.generateCode()
        }

    }
}
