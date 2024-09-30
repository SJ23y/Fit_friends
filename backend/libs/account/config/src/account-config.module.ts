import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './configurations/jwt.config';

const ENV_FILE_PATH = 'apps/api/env/account.env';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        envFilePath: ENV_FILE_PATH,
        load: [jwtConfig],
      })
    ]
  })
export class AccountConfigModule {}
