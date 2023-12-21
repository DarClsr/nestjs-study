import { Global, Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { UserModule } from 'src/user/user.module';


// 将某一个模块设置成全局 然后导出 既可以全局使用
@Global()
@Module({
  imports:[
    UserModule,
  ],
  controllers: [AaaController],
  providers: [AaaService],
  exports:[AaaService]
})
export class AaaModule {}
