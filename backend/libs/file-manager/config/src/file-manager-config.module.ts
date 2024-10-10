import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fileManagerConfig from './file-manager.config';

const ENV_FILE_PATH = 'apps/api/env/file.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      load: [fileManagerConfig]
    })
  ]
})
export class FileManagerConfigModule {}
