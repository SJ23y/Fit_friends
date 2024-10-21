export type PaginatedResult<T> = {
  entities: T[],
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}


export type TrainingPaginatedResult<T> = {
  entities: T[],
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  minPrice: number,
  maxPrice: number,
  minCallories: number,
  maxCallories: number
}
