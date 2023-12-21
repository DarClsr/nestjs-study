import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from './user/entities/role.entity';


declare module "express" {
  interface Request {
     user:{
      nameLstring,
      roles:Role[]
     }
  }
}

@Injectable()
export class LoginGuard implements CanActivate {


  @Inject(Reflector)
  private reflector: Reflector;
  @Inject(JwtService)
  private jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('authorization') || '';

    const requireLogin=this.reflector.getAllAndOverride("require-login",[
      context.getHandler(),
      context.getClass()
    ])
  
    if(!requireLogin){
      return true;
    }

    const bearer = authorization.split(' ');

    console.log(authorization,";;;;;55555")
    
    if(!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录 token 错误');
    }

    const token = bearer[1];

    

    try {
      const info = this.jwtService.verify(token);
      console.log(info.user)
      request.user = info.user;
      return true;
    } catch(e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
