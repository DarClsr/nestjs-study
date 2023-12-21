import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ValidationPipe, Session, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService:JwtService
    
    ) {}

  @Post("login")
  async jwtlogin(@Body(ValidationPipe) body:LoginDto,@Res({passthrough:true}) res:Response){
    const user=await this.userService.login(body); 
      const access_token = this.jwtService.sign({
        userId: user.id,
        username: user.name,
      }, {
        expiresIn: '30m'
      });
  
      const refresh_token = this.jwtService.sign({
        userId: user.id
      }, {
        expiresIn: '7d'
      });
      
      res.setHeader('authorzation', `bearer ${access_token}`);

      return {
        access_token,
        refresh_token,
        user:user.id
      }
     

  }

  @Get("refresh")
  async refreshToken(@Query("refresh_token") refreshToken:string){

    const {userId}=await this.jwtService.verify(refreshToken);
    console.log(userId)

    const user=await this.userService.findOne(userId);


    const access_token = this.jwtService.sign({
      userId: user.id,
      username: user.name,
    }, {
      expiresIn: '30m'
    });

    const refresh_token = this.jwtService.sign({
      userId: user.id
    }, {
      expiresIn: '7d'
    });

    return {
      access_token,
      refresh_token,
    }
    


  }

  @Post("session_login")
  async sesstion_login(@Body(ValidationPipe) body:LoginDto,@Session() session){
    console.log(body)
    const user=await this.userService.login(body); 
    session.user = {
      name: user.name
    }
    return "success"
  }

 

  @Post("register")
  async register(@Body(ValidationPipe) body:RegisterDto){
    return await this.userService.register(body);
    
  }

  @Get("done")
  async done(){
    //  await this.userService.initData2();
     return "done"
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
