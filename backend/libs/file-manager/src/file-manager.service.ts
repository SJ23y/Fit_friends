import 'multer';
import dayjs from 'dayjs';
import { Logger, Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileManagerConfig } from '@backend/file-manager-config';
import { join, parse } from 'node:path';
import { extension } from 'mime-types';
import { unlink, writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import { DEFAULT_FILE_NAMES } from '@backend/shared-core';


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

  public async writeFile(file?: Express.Multer.File, formerFilePath?: string): Promise<string | null> {
    if (!file) {
      return null;
    }

    if (formerFilePath && file) {
      console.log('Deleting file')
      await this.deleteFile(formerFilePath);
    } else {
      console.log('Not deleting file');
    }

    try {
      const fileExtension = extension(file.mimetype) || '';
      const fileName = `${crypto.randomUUID()}.${fileExtension}`;
      const uploadDirectoryPath = this.config.uploadsDirectory;
      const subDirectory = this.getSubUploadDirectoryPath();
      const path = this.getDestinationFilePath(fileName);

      console.log(join(this.getRootDirectoryPath(), subDirectory))
      await ensureDir(join(this.getRootDirectoryPath(), subDirectory));
      await writeFile(path, file.buffer);

      return join(uploadDirectoryPath, subDirectory, fileName);
    } catch(error) {
      this.logger.error(`Error while saving file: ${error}`);
      throw new Error('Can\'t save file');
    }
  }

  public async deleteFile(formerFilePath: string): Promise<void> {
    const {dir, base: formerfileName} = parse(formerFilePath);
      if (!DEFAULT_FILE_NAMES.includes(formerfileName)) {
        const oldPath = join(this.getRootDirectoryPath(), dir.replace('uploads', ''), formerfileName);
        await unlink(oldPath);
      }
  }
}
