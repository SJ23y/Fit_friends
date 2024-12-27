import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { DocumentExists } from '@backend/shared-core';

@Injectable()
export class DocumentExistsPipe<T> implements PipeTransform {

  constructor(
    private readonly entityService: DocumentExists<T>,
    private readonly entityName: string
  ) { }


  async transform(documentId: string): Promise<T>  {
    const data = await this.entityService.exists(documentId);

    if (! data) {
      throw new NotFoundException(`[DocumentExistsPipe] ${this.entityName} with ${documentId} not found`);
    }

    return data;
  }
}
