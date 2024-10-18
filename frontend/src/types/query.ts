import { FilterBy, SortBy, SortDirection } from "../consts";

export type Query = {
  count: number;
  sortDirection?: SortDirection;
  sortBy?: SortBy;
  filterBy?: FilterBy;
  page: number;
}
