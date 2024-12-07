import { FilterBy, SortBy, SortDirection, TrainDuration } from "../consts";

export type Query = {
  count: number;
  sortDirection?: SortDirection;
  sortBy?: SortBy;
  filterBy?: FilterBy;
  page: number;
  maxPrice?: number | null,
  minPrice?: number | null,
  maxCallories?: number | null,
  minCallories?: number | null,
  maxRating?: number | null,
  minRating?: number | null,
  type?: string[] | null,
  free?: boolean | null,
  durations?: TrainDuration[] | null,
  locations?: string[] | null,
  level?: string | null
}
