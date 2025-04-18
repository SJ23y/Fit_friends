import { CoachQuestionnarie, UserQuestionnarie } from '@backend/shared-core';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';


export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, { excludeExtraneousValues: true, ...options, })
}


export function parseTime(time: string) {
  const regex = /^(\d+)([smhdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] bad time string ${time}`);
  }

  const [,rawValue, rawUnit] = match;
  const value = parseInt(rawValue, 10);
  const unit = rawUnit as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error('[parseTime] Can\'t parse value count. Value isNaN.')
  }

  return {unit, value}
}

export const getRandomInteger = (a: number, b: number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


export const getRanndomElement = <T>(arr: T[]) => arr[getRandomInteger(0, arr.length - 1)];

export const  isUserQuestionnaire = (questionnaire: UserQuestionnarie | CoachQuestionnarie): questionnaire is UserQuestionnarie => {
  return (questionnaire as UserQuestionnarie).trainDuration !== undefined && (questionnaire as UserQuestionnarie).trainDuration !== null
}

export function getRabbitMqConnectionString({user, password, host, port}: {user:string, password: string, host:string, port:string}) {
  return `amqp://${user}:${password}@${host}:${port}`;
}

/*
export function getArrayOfUniques<T>(arr: T[]): T[] {
  const set = new Set(arr);
  return Array.from(set);
}

export function createUrlForFile(filePath: string, host: string): string {
  filePath.replace('\\', '/');
  return `${host}/static/${subDirectory}/${fileMetaData.hashName}`
}
*/
