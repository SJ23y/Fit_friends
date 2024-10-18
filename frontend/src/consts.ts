export const ACCESS_TOKEN_KEY_NAME = 'fitfriendsAccess';
export const REFRESH_TOKEN_KEY_NAME = 'fitfriendsRefresh';
export const LOCATIONS = ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'];

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

export enum TrainDuration {
  EXPRESS = '10-30 мин',
  FAST = '30-50 мин',
  MEDIUM = '50-80 мин',
  LONG = '80-100 мин'
}

export enum NameSpace {
  USER = 'USER',
  TRAINING = 'TRAINING',
  MAIN = 'MAIN'
}

export const ValidationSetting = {
  passwordMinLength: 6,
  passwordMaxLength: 12,
  userNameMinLength: 1,
  userNameMaxLength: 15
} as const;

export enum ApiRoute {
  Login = '/login',
  Register = '/register',
  Check = '/auth/check',
  Refresh = '/auth/refresh',
  Logout = '/logout',
  Trainings = '/trainings',
  Featured = '/trainings/featured'
}

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

export enum FilterBy {
  SPECIAL = 'isSpecialOffer',
  USER = 'user',
}

export enum SortBy {
  POPULAR = 'rating',

  DATE = 'createdAt'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export const Setting = {
  ApiTimeout: 5000,
  BaseUrl: 'http://localhost:3000',
  DefaultSortDirection: SortDirection.DESC,
  DefaultSortBy: SortBy.DATE,
  DefaultStartPage: 1,
  DefaultTrainingPerPage: 7,
  MaxSpecialTrainingCount: 3,
  MaxPopularTrainingCount: 9,
  MaxFeaturedTrainingCount: 9,
  MaxItemsPerPage: 50,
  FeaturedSliderStep: 1,
  PopularSliderStep: 1,
  FeaturedCardPerStep: 3,
  PopularCardPerStep: 4,
  SPECIAL_TRAINING_DISCONT: 0.2
} as const;


