export interface PaginationResult<T> {
  entities: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface TrainingPaginationResult<T> extends PaginationResult<T> {
  minPrice: number,
  maxPrice: number,
  minCallories: number,
  maxCallories: number
}
