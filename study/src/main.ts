import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from './MyLogger';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置静态文件 页面 
  app.useStaticAssets(join(__dirname,"..","public"),{
    prefix:"/static"
  })

  app.use(function (req:Request,res:Response,next:NextFunction){
    console.log(req.url,"before")
    next()
    console.log("after")
  })

  // app.useLogger(new MyLogger());

  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  app.setGlobalPrefix('')
  await app.listen(3000);
  console.log(`server start success http://localhost:${3000}`)
}
bootstrap();
