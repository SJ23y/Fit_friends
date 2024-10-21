import { Query } from "./types/query"

export const createQueryString = ({
  count,
  filterBy,
  sortBy,
  sortDirection,
  page,
  minPrice,
  maxPrice,
  maxCallories,
  minCallories,
  maxRating,
  minRating,
  type,
  free
}: Query) => {
  let queryString = `count=${count}&page=${page}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
  if (filterBy) {
    queryString += `&filterBy=${filterBy}`;
  }
  if (minPrice) {
    queryString += `&minPrice=${minPrice}`;
  }
  if (maxPrice) {
    queryString += `&maxPrice=${maxPrice}`;
  }
  if (minCallories) {
    queryString += `&minCallories=${minCallories}`;
  }
  if (maxCallories) {
    queryString += `&maxCallories=${maxCallories}`;
  }
  if (minRating) {
    queryString += `&minRating=${minRating}`;
  }
  if (maxRating) {
    queryString += `&maxRating=${maxRating}`;
  }
  if (free) {
    queryString += `&free=${free}`;
  }
  if (type) {
    type.forEach((type) => {
      queryString += `&type[]=${type}`;
    })
  }
  return queryString;
}
