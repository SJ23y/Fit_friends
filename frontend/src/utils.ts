import { Query } from "./types/query"

export const createQueryString = ({count, filterBy, sortBy, sortDirection, page}: Query) => {
  return `count=${count}&page=${page}&filterBy=${filterBy}&sortBy=${sortBy}&sortDirection=${sortDirection}`
}
