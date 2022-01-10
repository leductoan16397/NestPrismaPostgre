import { JwtPayload } from './interfaces/jwt-payload.interface';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { Request } from 'express';
import { UserService } from 'user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { RefreshTokenService } from 'auth/refresh-token/refresh-token.service';
import { ConfigService } from 'core/config/config.service';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '../../../prisma/generated/prisma-client-js';

@Injectable()
export class AuthService {
  cryptr: any;
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private readonly appConfig: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  private async createAccessToken(userId: string | number) {
    const accessToken = sign({ userId }, this.appConfig.jwtSecreKey, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return accessToken;
  }

  private async createRefreshToken(@Req() req: Request, userId: number) {
    const input: Prisma.RefreshTokenUncheckedCreateInput = {
      userId,
      refreshToken: v4(),
    };
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      input,
    );
    return refreshToken;
  }

  async findRefreshToken(token: string) {
    const userId = await this.refreshTokenService.findRefreshToken(token);
    return userId;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: jwtPayload.userId,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<void> {
    await this.userService.isEmailUnique(createUserDto.email);
    await this.prisma.user.create({ data: createUserDto });
  }

  async login(req: Request, loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(loginUserDto.email);
    await this.userService.checkPassword(loginUserDto.password, user);
    return {
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      expires: new Date(new Date().getTime() + 1000 * 60 * 60),
      accessToken: await this.createAccessToken(user.id),
      refreshToken: await this.createRefreshToken(req, user.id),
    };
  }

  async logout(userId: number, refreshAccessTokenDto: RefreshAccessTokenDto) {
    await this.refreshTokenService.deleteByToken(
      userId,
      refreshAccessTokenDto.refreshToken,
    );
    return { mess: 'logout successfully' };
  }

  async logoutAll(userId: number) {
    await this.refreshTokenService.deleteByUserId(userId);
    return { mess: 'logout successfully' };
  }

  async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
    const userId = await this.findRefreshToken(
      refreshAccessTokenDto.refreshToken,
    );
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    return {
      accessToken: await this.createAccessToken(user.id),
      expires: new Date(new Date().getTime() + 1000 * 60 * 60),
    };
  }
}
