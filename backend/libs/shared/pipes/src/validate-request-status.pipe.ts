import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { RequestStatus } from '@backend/shared-core';

@Injectable()
export class ValidateRequestStatusPipe implements PipeTransform {
  transform(value: RequestStatus) {
    if (!Object.values(RequestStatus).includes(value)) {
      throw new BadRequestException('Wrong status value');
    }
    return value;
  }
}
