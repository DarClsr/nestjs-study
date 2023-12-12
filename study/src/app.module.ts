import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PersonService } from './person/person.service';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService,PersonService],
})
export class AppModule {}
