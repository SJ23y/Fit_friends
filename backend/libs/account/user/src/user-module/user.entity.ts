import { Entity, StorableEntity, AuthUser, Gender, Role, UserQuestionnarie, CoachQuestionnarie } from '@backend/shared-core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.consts';
import { Review, Training, Purchase } from '@prisma/client';

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
  public questionnaire?: UserQuestionnarie | CoachQuestionnarie;
  public passwordHash: string;
  public role: Role;
  public reviews?: Review[];
  public trainings?: Training[];
  public purchases?: Purchase[];

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
      this.questionnaire = user.questionnaire;
      this.id = user.id ?? '';
      this.passwordHash = user.passwordHash;
      this.role = user.role ?? Role.USER;
      this.reviews = user.reviews;
      this.trainings = user.trainings;
      this.purchases = user.purchases;
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
      role: this.role,
      reviews: this.reviews,
      trainings: this.trainings,
      purchases: this.purchases,
    }
  }
}
