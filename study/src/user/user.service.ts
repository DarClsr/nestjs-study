import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm/dist';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(User)
  private userRepository:Repository<User> 

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where:{
        id
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
   return this.userRepository.save({
    id,
    ...updateUserDto
   })
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
