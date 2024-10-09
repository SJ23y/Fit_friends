import { AuthUser, EntityFactory } from "@backend/shared-core";
import { UserEntity } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  create(entityPlainData: AuthUser): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
