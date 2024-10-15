export enum AppRoute {
  Intro = '/',
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
  Auth = 'auth',
  NoAuth = 'noauth',
  Unknown = 'unknown'
}

export enum NameSpace {
  USER = 'USER'
}

export const ValidationSetting = {
  passwordMinLength: 6,
  passwordMaxLength: 12,
  userNameMinLength: 1,
  userNameMaxLength: 15
} as const;

export const Setting = {
  ApiTimeout: 5000,
  BaseUrl: 'http://localhost:3000',

} as const;

export enum ApiRoute {
  Login = '/login',
  Register = '/register',
  Check = '/auth/check',
  Refresh = '/auth/refresh',
  Logout = '/logout'
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

export const ACCESS_TOKEN_KEY_NAME = 'fitfriendsAccess';
export const REFRESH_TOKEN_KEY_NAME = 'fitfriendsRefresh'
