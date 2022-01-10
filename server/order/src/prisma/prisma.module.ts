import { Module, OnModuleInit } from '@nestjs/common';
import { UserPrismaMiddleware } from './middleware/user.middleware';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, UserPrismaMiddleware],
  exports: [PrismaService],
})
export class PrismaModule implements OnModuleInit {
  onModuleInit() {
    console.log(`PrismaModule has been initialized.`);
  }
}
