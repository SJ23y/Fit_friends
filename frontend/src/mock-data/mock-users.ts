import { faker } from '@faker-js/faker';
import { UserData } from '../types/auth';
import { getRanndomElement } from '../utils';
import { Gender, LOCATIONS, Role } from '../consts';
import { generateMockUserQuestionnaire } from './mock-questionnaire';

export function generateMockUser(): UserData {
  return {
    name:  faker.person.fullName(),
    email: faker.internet.email(),
    gender: getRanndomElement(Object.values(Gender)),
    birthDate: faker.date.birthdate().toISOString(),
    description: faker.person.bio(),
    location: getRanndomElement(LOCATIONS),
    backgroundImage: faker.system.fileName(),
    role: getRanndomElement(Object.values(Role)),
    questionnaire: generateMockUserQuestionnaire(),
    avatar: new File([new Blob()], "avatar"),
    password: faker.internet.password()
  }
}
