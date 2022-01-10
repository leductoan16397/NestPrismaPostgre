import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '../../../prisma/generated/prisma-client-js';

@Injectable()
export class RefreshTokenService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async createRefreshToken(input: Prisma.RefreshTokenUncheckedCreateInput): Promise<string> {
    const refreshToken = await this.prisma.refreshToken.create({ data: input });
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string) {
    const refreshToken = await this.prisma.refreshToken.findFirst({ where: { refreshToken: token } });
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.userId;
  }

  async deleteByToken(userId: number, refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({ where: { AND: { userId, refreshToken } } });
  }

  async deleteByUserId(userId: number) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }
}
