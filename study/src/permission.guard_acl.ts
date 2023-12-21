import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RedisService } from './redis/redis.service';
import { UserService } from './user/user.service';

declare module 'express-session' {
  interface Session {
    user: {
      name: string;
    };
  }
}

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(Reflector)
  private reflector: Reflector;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request?.session.user;
    
    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    // 查询redis中用户的权限

    console.log(`user_${user.name}_permissions`)
     let user_permissions=await this.redisService.listGet(`user_${user.name}_permissions`)
     console.log(user_permissions,'redis')


    //  如果redis中没有用户权限记录 就从数据库获取 然后 存储到redis里面
     if(user_permissions.length===0){
          // 根据session 获取用户信息
          const foundUser = await this.userService.findByUsername(user.name);
          user_permissions=foundUser.permissions.map(v=>v.name);
          this.redisService.listSet(`user_${user.name}_permissions`,user_permissions,60 * 30)
     }

     console.log(user_permissions)

    // 查询接口权限 然后在用户权限中查找是否有这个权限
    const permission = this.reflector.get('permission', context.getHandler());
    if (user_permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
