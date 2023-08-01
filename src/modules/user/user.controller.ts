import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.inteceptor';
import { UserDto } from './dto/res/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../../entity/user.entity';
import { Roles } from '@/decorator/role.decorator';
import { RolesType } from '@/shared/enum/role-type';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtGuard } from '@/guards/jwt.guard';
import { UserWithRoleDto } from './dto/res/user-with-role.dto';

@Controller('user')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/list')
  @Roles(RolesType.ADMIN)
  getListUser() {
    return this.userService.getListUser();
  }

  @Get('/me')
  @Serialize(UserDto)
  getCurent(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Get('/users-with-role')
  @Serialize(UserWithRoleDto)
  @Roles(RolesType.ADMIN)
  getUsersWithRole() {
    return this.userService.getUsersWithRole();
  }

  @Get('/:id')
  @Serialize(UserDto)
  @Roles(RolesType.ADMIN)
  getUser(@Param() param: { id?: number | string }) {
    return this.userService.getUserById(Number(param.id));
  }

  @Post()
  @Roles(RolesType.ADMIN)
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Patch('/:id')
  @Roles(RolesType.ADMIN)
  updateUser(@Param('id') id: string, @Body() body: Partial<CreateUserDto>) {
    return this.userService.updateUser(Number(id), body);
  }
}
