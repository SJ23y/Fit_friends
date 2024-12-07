import { jwtDecode } from "jwt-decode";
import { CoachQuestionnaire, UserQuestionnaire } from "./types/auth";
import { Query } from "./types/query"
import dayjs from "dayjs";
import { Action } from "@reduxjs/toolkit";

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
  durations,
  locations,
  level
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
  if (level) {
    queryString += `&level=${level}`;
  }
  if (type) {
    type.forEach((item) => {
      queryString += `&type[]=${item}`;
    })
  }
  if (locations) {
    locations.forEach((location) => {
      queryString += `&locations[]=${location}`;
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
  return (questionnaire as UserQuestionnaire)?.trainDuration !== null;
}

export const  isCoachQuestionnaire = (questionnaire: UserQuestionnaire | CoachQuestionnaire): questionnaire is CoachQuestionnaire => {
  return (questionnaire as CoachQuestionnaire)?.individualTraining !==  null;
}

export const isTokenExpired = (token: string) => {
  const payload = jwtDecode(token);
  if (payload.exp) {
    return dayjs().isAfter(dayjs.unix(payload.exp));
  }
}

export const getRandomInteger = (a: number, b: number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


export const getRanndomElement = <T>(arr: T[]) => arr[getRandomInteger(0, arr.length - 1)];

export const extactActionsType = (actions: Action<string>[]) => actions.map(({ type }) => type);
