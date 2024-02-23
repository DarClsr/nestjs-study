import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Query,
  Session,
  Sse,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger/dist';
import { exec } from 'child_process';
import { join } from 'path';
import { Observable } from 'rxjs';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { AaaService } from './aaa/aaa.service';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard_jwt';
import { MyLogger } from './MyLogger';
import { PersonService } from './person/person.service';
import { QuerypageInterceptor } from './querypage.interceptor';
import { ShortLongMapService } from './short-long-map.service';
import { UserService } from './user/user.service';
import { ValidatePipe } from './validate.pipe';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
const childProcess = exec('tail -f ./log');
childProcess.stdout.on('data', (msg) => {
  console.log({
    msg
  }) 
})

childProcess.on('error', (error) => {
  console.error(`子进程出错：${error.message}`);
});

// 控制器
@Controller()
export class AppController {
  constructor(
    // 构造注入服务
    private readonly appService: AppService,
    // @Inject("user") private readonly userService:UserService,
    @Inject(AaaService) private readonly aaa: AaaService,
  ) {}
  @Inject(ShortLongMapService)
  private shortLongMapService: ShortLongMapService;
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;
  // 属性注入服务
  @Inject(PersonService)
  personService: PersonService;

  // api
  @ApiOperation({ summary: '测试 /', description: 'hello world' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'hello world 成功',
    type: String,
  })
  @Get()
  getHello(): string {
    // this.userService.create({
    //   username:"iwan"
    // })

    return this.appService.getHello();
  }
  @Get('sss')
  async getSession(@Session() session) {
    session.count = session.count ? session.count + 1 : 1;
    console.log(session);
    return session.count;
  }

  @Get('aa')
  @UseGuards(LoginGuard)
  @ApiOperation({ summary: '测试 aa 接口', description: 'aaa' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'hello world 成功',
    type: String,
  })
  @ApiQuery({
    name: 'a1',
    type: String,
    description: 'a1 param',
    required: false,
    example: '1111',
  })
  @ApiQuery({
    name: 'a2',
    type: Number,
    description: 'a2 param',
    required: true,
    example: '222',
  })
  async getAad() {
    return 'aaaa';
  }

  @ApiOperation({ summary: '测试 bb', description: 'bb 描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'bbb 成功',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'id 不合法',
  })
  @ApiParam({
    name: 'id',
    description: 'ID',
    required: true,
    example: 222,
  })
  @Get('bb/:id')
  @UseGuards(LoginGuard)
  async getbbb() {
    return 'bbbb';
  }
  @Get('profile.json')
  @UseInterceptors(QuerypageInterceptor)
  getProfile(): string {
    // this.userService.create({
    //   username:"iwan"
    // })
    return 'profile';
  }


  @UseGuards(LoginGuard)
  @Get('login')
  login(): string {
    return 'login success';
  }

  @Get('num')
  async getNum(@Query('num', ValidatePipe) num) {
    console.log(num);
    return num;
  }

  @Get('shortUrl')
  async generateShortUrl(@Query('url') longUrl) {
    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }

    return this.shortLongMapService.generate(longUrl);
  }

  // @Sse('stream')
  // stream() {
  //   return new Observable((observer) => {
  //     observer.next({ data: { msg: 'aaa' } });

  //     setTimeout(() => {
  //       observer.next({ data: { msg: 'bbb' } });
  //     }, 2000);

  //     setTimeout(() => {
  //       observer.next({ data: { msg: 'ccc' } });
  //     }, 5000);
  //   });
  // }

  @Sse('stream2')
  stream2() {
    console.log({
      path:join(__dirname,"../src/log")
      // D:\project\nestjs-study\study\src
    })
    //  const child_process=exec("tail -f "+join(__dirname,"../src/log"))
     const childProcess = exec('tail -f ./log');
     
     return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        console.log({
          msg
        })
        observer.next({ data: { msg: msg.toString() }});
      })
    });
  }

  @Get('aaaa')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  async getaaa(@Query('num') num) {
    this.logger.log(`get aaaa`);
    return 'aaaa';
  }

  
  @Get(':code')
  async getLongUrl(@Param('code') code) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);
    if (!longUrl) {
      throw new BadRequestException('链接不能为空');
    }

    return {
      longUrl,
      statusCode: 302,
    };
  }
}
