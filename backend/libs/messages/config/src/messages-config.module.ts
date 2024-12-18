import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import messagesConfig from './messages.config';

const ENV_FILE_PATH = 'apps/api/env/notification.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      load: [messagesConfig]
    })
  ]
})
export class MessagesConfigModule {}
