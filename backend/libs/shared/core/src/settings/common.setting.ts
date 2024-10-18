export enum PaymentType {
  VISA = 'visa',
  MIR = 'mir',
  UMONEY = 'umoney'
}

export enum FilterBy {
  SPECIAL = 'isSpecialOffer',
  USER = 'user'
}

export enum SortBy {
  POPULAR = 'rating'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}


export const DEFAULT_PAGE_NUMBER = 1;
export const AUTH_GUARD_CHECK_URL = `https://localhost:3000/auth/check`
export const MAX_PURCHASE_COUNT_LIMIT = 50;
