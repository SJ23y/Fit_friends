import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileManagerService } from './file-manager.service';


@Module({
  imports: [ServeStaticModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => {
                  const uploadDirectory = configService.get<string>('application.uploadDirectory') ?? '';
                  return [{
                  rootPath: join(__dirname, uploadDirectory),
                  serveStaticOptions: {
                    fallthrough: true,
                    etag: true
                  }}]
                }
              })
  ],
  providers: [FileManagerService],
  controllers: [],
  exports: [FileManagerService]
})
export class FileManagerModule {}
