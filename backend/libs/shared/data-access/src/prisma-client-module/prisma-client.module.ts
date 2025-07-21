import { Global, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service';
import { DataGenerator } from '../prisma/data-generator/data-generator';

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService, DataGenerator]
})
export class PrismaClientModule {}
