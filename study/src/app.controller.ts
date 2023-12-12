import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';


// 控制器
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly personService:PersonService
    ) {}

// api
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
