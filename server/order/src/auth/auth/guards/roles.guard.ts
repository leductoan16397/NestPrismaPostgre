import {
  Injectable,
  // CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
// import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../../prisma/generated/prisma-client-js';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user: User, info: Error, context: ExecutionContext): any {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const hasRole = () => roles.includes(user.role);
    if (!user) {
      throw new UnauthorizedException(info.message);
    }
    if (!(user.role && hasRole())) {
      throw new ForbiddenException('Forbidden');
    }
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }
}
