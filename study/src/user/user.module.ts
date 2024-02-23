import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from './entities/user.entity';
import { Permission } from './entities/permission.entity';
import { PermissionGuard } from 'src/permission.guard';
import { Role } from './entities/role.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User,
      Permission,
      Role
    ]),
    EmailService
  ],
  controllers: [UserController],
  providers: [UserService,PermissionGuard,EmailService],
  exports:[UserService,PermissionGuard]
})
export class UserModule {}
