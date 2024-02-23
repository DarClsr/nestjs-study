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
import { transports, format } from 'winston';
import * as chalk from 'chalk';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './user/entities/permission.entity';
import { BbbModule } from './bbb/bbb.module';
import { RedisModule } from './redis/redis.module';
import { Role } from './user/entities/role.entity';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { MapModule } from './map/map.module';
import { EmailService } from './email/email.service';
import { UniqueCode } from './entities/uniqueCode.entity';
import { UniqueCodeService } from './unique-code/unique-code.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ShortLongMapService } from './short-long-map.service';
import { ShortLongMap } from './entities/shortLongMap.entity';

@Module({
  imports: [
    PersonModule,
    UserModule,
    AaaModule,
    ConfigModule.forRoot({
      envFilePath: [join(process.cwd(), '.env')],
    }),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);
              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: '111.log',
          dirname: 'log',
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DBURI,
      port: +process.env.DBPORT,
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      synchronize: true,
      logging: true,
      entities: [User, Permission, Role, UniqueCode,ShortLongMap],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'iwan',
      signOptions: {
        expiresIn: '3m',
      },
    }),
    BbbModule,
    RedisModule,
    MapModule,
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
      provide: 'value',
      useValue: {
        name: 'iwan',
        age: 53,
        render() {
          console.log(this.name);
        },
      },
    },
    EmailService,
    UniqueCodeService,
    ShortLongMapService,
  ],
})
export class AppModule implements NestModule {
  configure(customer: MiddlewareConsumer) {
    customer.apply(LogMiddleware).forRoutes('profile.json');
  }
}
