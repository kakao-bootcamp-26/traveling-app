import { Controller } from '@nestjs/common';
// import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   @Post()
  //   create(@Body() user: User) {
  //     return this.usersService.create(user);
  //   }

  //   @Get()
  //   findAll() {
  //     return this.usersService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.usersService.findOne(+id);
  //   }

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() user: User) {
  //     return this.usersService.update(+id, user);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.usersService.remove(+id);
  //   }
}
