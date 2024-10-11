export enum AppRoute {
  Login = '/login',
  Register = '/register',
  Questionnaire = '/questionnaire',
  Main = '/index',
  Account = '/account',
  Orders = '/orders',
  Trainings = '/trainings',
  Training = '/training'
}

export enum AuthorizationStatus {
  Auth,
  NoAuth,
  Unknown
}

export enum NameSpace {
  USER = 'USER'
}

export const Setting = {
  ApiTimeout: 5000,
  BaseUrl: 'http://localhost:3000'
} as const;

export enum ApiRoute {
  Login = '/login',
  Register = '/register'
}

export const LOCATIONS = ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'];

export enum UserLevel {
  PRO = 'профессионал',
  AMATEUR = 'любитель',
  NEWBIE = 'новичок'
};

export enum Gender {
  MALE =  'мужской',
  FEMALE = 'женский',
  NONE = 'неважно'
};

export enum Role {
  USER =  'user',
  COACH = 'coach'
};
