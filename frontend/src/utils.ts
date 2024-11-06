import { duration } from "@mui/material";
import { CoachQuestionnaire, UserQuestionnaire } from "./types/auth";
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
  free,
  durations
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
  if (durations) {
    durations.forEach((duration) => {
      queryString += `&durations[]=${duration}`;
    })
  }
  return queryString;
}

export const  isUserQuestionnaire = (questionnaire: UserQuestionnaire | CoachQuestionnaire): questionnaire is UserQuestionnaire => {
  return (questionnaire as UserQuestionnaire).isReadyForTrain !== null
}

export const  isCoachQuestionnaire = (questionnaire: UserQuestionnaire | CoachQuestionnaire): questionnaire is CoachQuestionnaire => {
  return (questionnaire as CoachQuestionnaire).description !== null
}
