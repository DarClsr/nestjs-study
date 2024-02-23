import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ValidationPipe,
  Session,
  Query,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  EmailLoginDto,
  LoginDto,
  RegisterDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import * as Qrcode from "qrcode"
import { randomUUID } from 'crypto';

const map = new Map<string, QrCodeInfo>();

interface QrCodeInfo{
  status: 'noscan' | 'scan-wait-confirm' | 'scan-confirm' | 'scan-cancel' | 'expired',
  userInfo?: {
    userId: number;
  }
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private redisService: RedisService,
  ) {}

  @Post('login')
  async jwtlogin(
    @Body(ValidationPipe) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.login(body);
    const access_token = this.jwtService.sign(
      {
        userId: user.id,
        username: user.name,
      },
      {
        expiresIn: '30m',
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '7d',
      },
    );

    res.setHeader('authorzation', `bearer ${access_token}`);

    return {
      access_token,
      refresh_token,
      user: user.id,
    };
  }

  @Get('code')
  async getEmailCode(@Query('address') address) {
    const code = this.generateRandomString(6);
    console.log({
      key: `captcha_${address}`,
    });
    await this.redisService.set(`captcha_${address}`, code, 60 * 5);
    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的登录验证码是${code}</p>`,
    });
    return '发送成功';
  }

  @Get("qrcode/generate")
  async generateCode(){
    const uuid=randomUUID();
    const dataUrl=await Qrcode.toDataURL(`http://192.168.0.156:3006/static/confirm.html?id=${uuid}`)
    map.set(`qrcode_${uuid}`, {
      status: 'noscan'
    });
    return {
      qrcode_id:uuid,
      img:dataUrl,
      href:`http://192.168.0.156:3006/static/confirm.html?id=${uuid}`
    }
  }

  @Get("qrcode/check")
  async checkCode(@Query('id') id: string){
    return map.get(`uuid_${id}`);
  }

  @Post("qrcode/login")
  async loginByQrcode(@Body() body){
    console.log(body)
    return {
      status:"success"
    }
  }

  @Get("qrcode/scan")
  async scanQrcode(@Query('id') id: string){

    const info=map.get(`uuid_${id}`)
    if(!info) {
      throw new BadRequestException("二维码已过期")
    }
    info.status = 'scan-wait-confirm';
    return "success"
  }

  @Get('qrcode/confirm')
async confirm(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if(!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-confirm';
    return 'success';
}

@Get('qrcode/cancel')
async qrcodeCncel(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if(!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-confirm';
    return 'success';
}

  @Post('login/email')
  async loginByEmail(@Body(ValidationPipe) body: EmailLoginDto) {
    const { account, code } = body;
    const save_code = await this.redisService.get(`captcha_${account}`);
    if (!save_code) {
      throw new BadRequestException('验证码已失效');
    }

    if (code !== save_code) {
      throw new BadRequestException('验证码错误');
    }

    return true;
  }

  generateRandomString(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  @Get('refresh')
  async refreshToken(@Query('refresh_token') refreshToken: string) {
    try {
      const { userId } = await this.jwtService.verify(refreshToken);
      const user = await this.userService.findOne(userId);
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.name,
        },
        {
          expiresIn: '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @Post('session_login')
  async sesstion_login(
    @Body(ValidationPipe) body: LoginDto,
    @Session() session,
  ) {
    console.log(body);
    const user = await this.userService.login(body);
    session.user = {
      name: user.name,
    };
    return 'success';
  }

  @Post('register')
  async register(@Body(ValidationPipe) body: RegisterDto) {
    return await this.userService.register(body);
  }

  @Get('done')
  async done() {
    await this.userService.initData2();
    return 'done';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
