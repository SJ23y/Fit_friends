import 'multer';
import dayjs from 'dayjs';
import { Logger, Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileManagerConfig } from '@backend/file-manager-config';
import { join } from 'node:path';
import { extension } from 'mime-types';
import { writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';


@Injectable()
export class FileManagerService {
  private readonly logger = new Logger(FileManagerService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(FileManagerConfig.KEY)
    private readonly config: ConfigType<typeof FileManagerConfig>
  ) {}

  private getRootDirectoryPath(): string {
    return join(this.config.staticDirectory,this.config.uploadsDirectory);
  }

  private getSubUploadDirectoryPath() {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getRootDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  public async writeFile(file?: Express.Multer.File): Promise<string | null> {
    if (!file) {
      return null;
    }

    try {
      const uploadDirectoryPath = this.config.uploadsDirectory;
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype) || '';
      const fileName = `${crypto.randomUUID()}.${fileExtension}`;
      const path = this.getDestinationFilePath(fileName);

      await ensureDir(join(this.getRootDirectoryPath(), subDirectory));
      await writeFile(path, file.buffer);

      return join(uploadDirectoryPath, subDirectory, fileName, fileExtension)
    } catch(error) {
      this.logger.error(`Error while saving file: ${error}`);
      throw new Error('Can\'t save file');
    }
  }
}
