import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { RequireLogin } from 'src/login.decorator';
import { LoginGuard } from 'src/login.guard_jwt';
import { RequirePermission } from 'src/permission.decorator';
import { PermissionGuard } from 'src/permission.guard';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';

@Controller('aaa')
@RequireLogin()
@UseGuards(LoginGuard,PermissionGuard)
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()

  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @SetMetadata("permission","find_aaa")
  @RequirePermission("find_aaa")
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
