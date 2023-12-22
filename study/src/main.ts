import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from './MyLogger';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置静态文件 页面
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static',
  });

  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log(req.url, 'before');
    next();
    console.log('after');
  });

  // session 登录

  app.enableCors();

  // 配置接口文档

  const config = new DocumentBuilder()
    .setTitle('study接口文档')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('admin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.use(
    session({
      secret: 'iwan',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // app.useGlobalPipes(new ValidationPipe())

  //   resave 为 true 是每次访问都会更新 session，不管有没有修改 session 的内容，而 false 是只有 session 内容变了才会去更新 session。

  // saveUninitalized 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象。比如你没有登录的时候，也会初始化一个 session 对象，这个设置为 false 就好。

  // app.useLogger(new MyLogger());

  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  app.setGlobalPrefix('');
  await app.listen(process.env.PORT);
  console.log(`server start success http://localhost:${process.env.PORT}`);
}
bootstrap();
