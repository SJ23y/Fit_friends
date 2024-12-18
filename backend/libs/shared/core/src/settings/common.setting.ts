export enum PaymentType {
  VISA = 'visa',
  MIR = 'mir',
  UMONEY = 'umoney'
}

export enum FilterBy {
  SPECIAL = 'isSpecialOffer',
  USER = 'user',
  ACTIVE_PURCHASE = 'active',
  COACH = 'coach'
}

export enum SortBy {
  POPULAR = 'rating',
  DATE = 'createdAt',
  TOTAL_PRICE = 'totalPrice',
  TRAININGS_COUNT = 'trainingsCount',
  PRICE = 'price',
  ROLE = 'role'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export const CLIENT_URL = 'http://localhost'
export const SERVER_URL = 'http://localhost:3000/'
export const DEFAULT_PAGE_NUMBER = 1;
export const AUTH_GUARD_CHECK_URL = `http://localhost:3000/auth/check`
export const MAX_PURCHASE_COUNT_LIMIT = 50;
