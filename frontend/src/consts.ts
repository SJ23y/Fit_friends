export const ACCESS_TOKEN_KEY_NAME = 'fitfriendsAccess';
export const REFRESH_TOKEN_KEY_NAME = 'fitfriendsRefresh';
export const LOCATIONS = ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'];
export const TRAIN_TYPES = ['йога', 'бег', 'бокс', 'стрейчинг', 'кроссфит', 'аэробика', 'пилатес'];

export enum AppRoute {
  Intro = '/',
  Login = '/login',
  Register = '/register',
  Questionnaire = '/questionnaire',
  Main = '/index',
  Account = '/account',
  Orders = '/orders',
  Purchases = '/purchases',
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

export enum PaymentType {
  VISA = 'visa',
  MIR = 'mir',
  UMONEY = 'umoney'
}

export enum NameSpace {
  USER = 'USER',
  TRAINING = 'TRAINING',
  MAIN = 'MAIN',
  REVIEW = 'Review',
  PURCHASE = 'Purchase'
}

export const ValidationSetting = {
  passwordMinLength: 6,
  passwordMaxLength: 12,
  userNameMinLength: 1,
  userNameMaxLength: 15,
  ReviewContentMaxLength: 1024,
  ReviewContentMinLength: 100,
  PurchaseMaxCount: 50,
  PurchaseMinCount: 1
} as const;

export enum ApiRoute {
  Login = '/login',
  Register = '/register',
  Check = '/auth/check',
  Refresh = '/auth/refresh',
  Logout = '/logout',
  Trainings = '/trainings',
  Featured = '/trainings/featured',
  Reviews = '/reviews',
  Purchases = '/purchase',
  UserUpdate = '/user/update'
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
  ACTIVE_PURCHASE = 'active'
}

export enum SortBy {
  POPULAR = 'rating',
  DATE = 'createdAt',
  TOTAL_PRICE = 'totalPrice',
  TRAININGS_COUNT = 'trainingsCount',
  PRICE = 'price'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export const Setting = {
  ApiTimeout: 5000,
  BaseUrl: 'http://localhost:3000',
  StaticUrl: 'http://localhost:5173/public',
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
  SPECIAL_TRAINING_DISCONT: 0.2,
  MaxRating: 5,
  DefaultPurchaseType: 'абонемент',
  OrdersPerPageCount: 4,
  TrainingsCatalogItemsPerPage: 6
} as const;


