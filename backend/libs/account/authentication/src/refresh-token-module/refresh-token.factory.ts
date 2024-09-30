import { EntityFactory, JwtToken } from '@backend/shared-core';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RefreshTokenFactory implements EntityFactory<RefreshTokenEntity> {
  create(entityPlainData: JwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData);
  }
}
