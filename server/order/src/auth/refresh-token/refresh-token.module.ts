import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    PrismaModule,
  ],
  exports: [RefreshTokenService],
  providers: [RefreshTokenService],
})
export class RefreshTokenModule {}
