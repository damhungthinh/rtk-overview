import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
