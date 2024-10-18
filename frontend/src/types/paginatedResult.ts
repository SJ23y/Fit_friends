export type PaginatedResult<T> = {
  entities: T[],
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}
