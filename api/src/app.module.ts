import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [UserModule, CoreModule],
})
export class AppModule {}
