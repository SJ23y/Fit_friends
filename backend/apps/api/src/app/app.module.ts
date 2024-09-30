import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@backend/authentication'
import { AccountConfigModule } from '@backend/user-config';

@Module({
  imports: [AccountConfigModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
