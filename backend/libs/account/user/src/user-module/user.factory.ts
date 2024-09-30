import { AuthUser, EntityFactory, Gender } from "@backend/shared-core";
import { UserEntity } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  create(entityPlainData: AuthUser): UserEntity {
    return new UserEntity(entityPlainData);
  }

  createUserFromDb(dbUser: User): UserEntity {
    const newUser = {
      ...dbUser,
      gender: dbUser.gender as Gender
    }

    return new UserEntity(newUser);
  }
}
