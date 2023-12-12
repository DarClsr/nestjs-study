import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置静态文件 页面 
  app.useStaticAssets(join(__dirname,"..","public"),{
    prefix:"/static"
  })

  app.setGlobalPrefix('')
  await app.listen(3000);
  console.log(`server start success http://localhost:${3000}`)
}
bootstrap();
