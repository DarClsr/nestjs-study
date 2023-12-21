import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PersonService } from './person/person.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AaaModule } from './aaa/aaa.module';
import { LogMiddleware } from './log.middleware';
import { WinstonModule } from './winston/winston.module';
import { transports,format } from 'winston';
import  * as chalk  from 'chalk';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './user/entities/permission.entity';
import { BbbModule } from './bbb/bbb.module';
import { RedisModule } from './redis/redis.module';
import { Role } from './user/entities/role.entity';

@Module({
  imports: [PersonModule, UserModule, AaaModule, 
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
          new transports.Console({
              format: format.combine(
                  format.colorize(),
                  format.printf(({context, level, message, time}) => {
                      const appStr = chalk.green(`[NEST]`);
                      const contextStr = chalk.yellow(`[${context}]`);
                      return `${appStr} ${time} ${level} ${contextStr} ${message} `;
                  })
              ),
          }),
          new transports.File({
              format: format.combine(
                  format.timestamp(),
                  format.json()
              ),
              filename: '111.log',
              dirname: 'log'
          })
      ]
  }),
  TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "nestjs_typeorm",
    synchronize: true,
    logging: true,
    entities: [User,Permission,Role],
    poolSize: 10,
    connectorPackage: 'mysql2', 
    extra: {
        authPlugin: 'sha256_password',
    }
  }),
  JwtModule.register({
    global:true,
    secret: 'iwan',
    signOptions: {
      expiresIn: '3m'
    }
  }),
  BbbModule,
  RedisModule
],
  controllers: [AppController],
  providers: [
    AppService,
    // 命名写法  provide 表示名称  useclass 表示注入的类
    // 通过 provide 指定 token，通过 useClass 指定对象的类，Nest 会自动对它做实例化后用来注入。
    {
      provide: PersonService,
      useClass: PersonService,
    },
    // {
    //   provide: "user",
    //   useClass: UserService,
    // },
    {
      provide:"value",
      useValue:{
        name:"iwan",
        age:53,
        render(){
          console.log(this.name)
        }
      }
    }
  ],
})
export class AppModule implements NestModule {
  configure (customer:MiddlewareConsumer){

    customer.apply(LogMiddleware).forRoutes("profile.json")
   
  }
}
