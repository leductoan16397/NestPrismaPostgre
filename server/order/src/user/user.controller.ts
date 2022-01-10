import {
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'auth/auth/decorators/roles.decorator';
import { RolesGuard } from 'auth/auth/guards/roles.guard';
import { UserEntity } from './entities/user.entity';
import { Role } from '../../prisma/generated/prisma-client-js';

@Controller('user')
@UseGuards(RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findAll(): Promise<unknown> {
    const users = await this.userService.findAll();

    return users.map((user) => new UserEntity(user));
  }
}
