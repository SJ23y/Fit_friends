//import { File } from '@project/shared-core';
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

/*
export function getRabbitMqConnectionString({user, password, host, port}) {
  console.log(`amqp://${user}:${password}@${host}:${port}`);
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getArrayOfUniques<T>(arr: T[]): T[] {
  const set = new Set(arr);
  return Array.from(set);
}

export function createUrlForFile(fileMetaData: File, host: string): string {
  const subDirectory = fileMetaData.subDirectory.replace('\\', '/');
  return `${host}/static/${subDirectory}/${fileMetaData.hashName}`
}*/
