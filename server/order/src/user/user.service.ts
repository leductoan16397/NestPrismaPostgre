import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { compareSync } from 'bcrypt-nodejs';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '../../prisma/generated/prisma-client-js';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async isEmailUnique(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new BadRequestException('Email already exists!!');
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found.');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Wrong email or password.');
    }
    return user;
  }

  async checkPassword(attemptPass: string, user: User) {
    const match = compareSync(attemptPass, user.password);
    if (!match) {
      throw new NotFoundException('Wrong email or password.');
    }
    return match;
  }
}
