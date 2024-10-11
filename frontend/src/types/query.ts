import { SortBy, SortDirection } from "../consts";

export type GuitarQuery = {
  count: number;
  sortDirection: SortDirection;
  sortBy: SortBy;
  page: number;
  types: string[];
  strings: number[]
}
