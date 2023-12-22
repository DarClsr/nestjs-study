import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class RedisService {
    @Inject('REDIS_CLIENT') 
    private redisClient: RedisClientType

    // 获取list
    async listGet(key:string){
        return await this.redisClient.lRange(key,0,-1)
    }



    // 添加list
    async listSet(key:string,list,ttl:number){
        for(let i = 0; i < list.length;i++) {
            await this.redisClient.lPush(key, list[i]);
        }
        if(ttl) {
            await this.redisClient.expire(key, ttl);
        }
    }

    // 添加地理位置
    async geoAdd(key:string,posName:string,postions:[number,number]){
        return await this.redisClient.geoAdd(key,{
            longitude:postions[0],
            latitude:postions[1],
            member:posName
        }) 
    }

    // 获取geo


    async getPos(key:string,posName:string){
        const res=await this.redisClient.geoPos(key,posName);
        console.log(res)
        if(!res.filter(v=>v).length){
            throw new BadRequestException("地理位置不存在")
        }
        return {
            name:posName,
            longitude:res[0]?.longitude,
            latitude:res[0]?.latitude
        }
    }
    async getAllGeos(key:string){
        const positions=await this.redisClient.zRange(key,0,-1);
        let list=[];
        for(let pos of positions){
            const res=await this.getPos(key,pos)
            list.push(res)
        }
        return list;
    }

    async geoSearch(key:string,pos:[number,number],radius:number,unit:any="km"){
        const positions=await this.redisClient.geoRadius(key,{
            longitude:pos[0],
            latitude:pos[1]
        },radius,unit)

        let list=[];
        for(let pos of positions){
            const res=await this.getPos(key,pos)
            list.push(res)
        }
        return list;
    }
}
