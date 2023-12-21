import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm/dist';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { EntityManager, In, Like, Repository } from 'typeorm';
import { CreateUserDto, LoginDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { Logger } from 'winston';
import { MyLogger } from 'src/MyLogger';
import { WINSTON_LOGGER_TOKEN } from 'src/winston/winston.module';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @Inject(WINSTON_LOGGER_TOKEN)
  logger: Logger;

  @InjectRepository(User)
  public userRepository: Repository<User>;
  @InjectRepository(Permission)
  public permissionRepository: Repository<Permission>;

  @InjectRepository(Role)
  public roleRepository: Repository<Role>;

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async initData() {
    const pe1 = new Permission();
    pe1.desc = '查询_aaa';
    pe1.name = 'find_aaa';
    const pe2 = new Permission();
    pe2.desc = '编辑_aaa';
    pe2.name = 'edit_aaa';
    const pe3 = new Permission();
    pe3.desc = '删除_aaa';
    pe3.name = 'remove_aaa';

    const user1 = new User();
    user1.name = '用户aaa';
    user1.password = '123456';
    user1.permissions = [pe1, pe2, pe3];
    const pe4 = new Permission();
    pe4.desc = '查询_bbb';
    pe4.name = 'find_bbb';
    const pe5 = new Permission();
    pe5.desc = '编辑_bbb';
    pe5.name = 'edit_bbb';
    const pe6 = new Permission();
    pe6.desc = '删除_bbb';
    pe6.name = 'remove_aaa';

    const user2 = new User();

    user2.name = '用户bbb';
    user2.password = '123456';
    user2.permissions = [pe4, pe5, pe6];
    await this.permissionRepository.save([pe1, pe2, pe3, pe4, pe5, pe6]);

    await this.userRepository.save([user1, user2]);
  }

  async initData2() {
    const role1 = new Role();

    role1.name = 'admin';

    role1.permissions = await this.permissionRepository.find({});

    const role2 = new Role();
    role2.name = 'user';
    role2.permissions = await this.permissionRepository.find({
      where: {
        name: Like('%aaa'),
      },
    });

    console.log(role1, 'role1');
    console.log(role2, 'role2');

    await this.roleRepository.save([role1, role2]);

    const user1 = new User();
    user1.name = 'user_role1';
    user1.password = 'e10adc3949ba59abbe56e057f20f883e';
    user1.roles = [role1];

    const user2 = new User();
    user2.name = 'user_role2';
    user2.password = 'e10adc3949ba59abbe56e057f20f883e';
    user2.roles = [role2];

    await this.userRepository.save([user1, user2]);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findRolesByIds(roles) {
    return await this.roleRepository.find({
      where: {
        id: In(roles),
      },
      relations:{
        permissions:true
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findByUsername(name: string) {
    const user = await this.userRepository.findOne({
      where: {
        name,
      },
      relations: {
        permissions: true,
        roles: true,
      },
    });
    return user;
  }

  async login(body: LoginDto) {
    console.log('body01');
    const user = await this.userRepository.findOne({
      where: {
        name: body.name,
      },
      relations: {
        roles: true,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', 200);
    }

    if (user.password !== md5(body.password)) {
      throw new HttpException('密码错误', 200);
    }
    
    return user;
  }
  async register(body: RegisterDto) {
    const user = await this.userRepository.findOne({
      where: {
        name: body.name,
      },
    });

    if (user) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = new User();
    newUser.name = body.name;
    newUser.password = md5(body.password);
    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }
}
