import { Controller, Get, Inject, Logger, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { AaaService } from './aaa/aaa.service';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { MyLogger } from './MyLogger';
import { PersonService } from './person/person.service';
import { QuerypageInterceptor } from './querypage.interceptor';
import { UserService } from './user/user.service';
import { ValidatePipe } from './validate.pipe';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';


// 控制器
@Controller()
export class AppController {
  constructor(
    // 构造注入服务
    private readonly appService: AppService,
    // @Inject("user") private readonly userService:UserService,
    @Inject(AaaService) private readonly aaa:AaaService
    ) {}
    @Inject(WINSTON_LOGGER_TOKEN)
    private logger;
    // 属性注入服务
    @Inject(PersonService)
    personService:PersonService

   

  // api
  @Get()
  getHello(): string {
    // this.userService.create({
    //   username:"iwan"
    // })
    return this.appService.getHello();
  }

  @Get("profile.json")
  @UseInterceptors(QuerypageInterceptor)
  getProfile(): string {
    // this.userService.create({
    //   username:"iwan"
    // })
    return "profile"
  }
  
  @UseGuards(LoginGuard)
  @Get("login")
  login():string{
    return "login success"
  }

  @Get("num")
  async getNum(@Query('num',ValidatePipe) num){
    console.log(num)
    return num;
  }


  
  @Get("aaaa")
  @Aaa("admin")
  @UseGuards(AaaGuard)
  async getaaa(@Query('num') num){
    this.logger.log(`get aaaa`)
    return "aaaa";
  }
}
