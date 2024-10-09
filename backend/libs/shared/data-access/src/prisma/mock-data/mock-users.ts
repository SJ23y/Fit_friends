// eslint-disable-next-line @nx/enforce-module-boundaries
import { Gender, User, LOCATIONS, Role, DEFAULT_AVATAR_NAMES, DEFAULT_BACKGROUND_IMAGE_NAMES } from "../../../../core/src/index";
import { faker } from '@faker-js/faker';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRanndomElement } from '../../../../helpers/src/common'

export function generateMockUser(): User {
  return {
    name:  faker.person.fullName(),
    email: faker.internet.email(),
    avatar: getRanndomElement(DEFAULT_AVATAR_NAMES),
    gender: getRanndomElement(Object.values(Gender)),
    birthDate: faker.date.birthdate().toISOString(),
    description: faker.person.bio(),
    location: getRanndomElement(LOCATIONS),
    backgroundImage: getRanndomElement(DEFAULT_BACKGROUND_IMAGE_NAMES),
    role: Role.USER
  }
}
