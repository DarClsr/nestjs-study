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
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { UserService } from './user/user.service';



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
    
    if(!request.user) {
      return true;
    }

    const roles = await this.userService.findRolesByIds(request.user.roles.map(item => item.id))


    const permissions: Permission[]  = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);

    const requirePermissions=this.reflector.getAllAndOverride("require-permission",[
      context.getClass(),
      context.getHandler(),
    ])

    if(!requirePermissions){
      return true;
    }



    for(let permission_item of requirePermissions){

      const per=permissions.find(v=>v.name===permission_item);

      if(!per){
        throw new UnauthorizedException("您没有该接口的访问权限") 
      }

    }



    return true;

  }
}
