import { Entity, StorableEntity, AuthUser, Gender } from '@backend/shared-core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.consts';

const DEFAULT_USER_AVATAR = 'default-avatar.jpg'

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public name:  string;
  public email: string;
  public avatar: string;
  public gender: Gender;
  public birthDate: string;
  public description: string;
  public location: string;
  public backgroundImage: string;
  public createdAt?: Date;
  public questionnaire: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (user) {
      this.email = user.email;
      this.name = user.name;
      this.avatar = user.avatar ?? DEFAULT_USER_AVATAR;
      this.gender = user.gender;
      this.birthDate = user.birthDate;
      this.description = user.description;
      this.location = user.location;
      this.backgroundImage = user.backgroundImage;
      this.createdAt = user.createdAt;
      this.questionnaire = user.questionnaire ?? '';
      this.id = user.id ?? '';
      this.passwordHash = user.passwordHash;
    }

  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toPOJO(): AuthUser {
    return {
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      gender: this.gender,
      birthDate: this.birthDate,
      description: this.description,
      location: this.location,
      backgroundImage: this.backgroundImage,
      createdAt: this.createdAt,
      questionnaire: this.questionnaire,
      id: (this.id) ? this.id : undefined,
      passwordHash: this.passwordHash,
    }
  }
}
