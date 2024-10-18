import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { Training, Trainings } from '../../types/trainings';
import { PaginatedResult } from '../../types/paginatedResult';
import { createQueryString } from '../../utils';
import { Query } from '../../types/query';

const uploadTrainings = createAsyncThunk<
  PaginatedResult<Training>,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Data: ', data);
  return data;
});

const uploadFeaturedTrainings = createAsyncThunk<
  Trainings,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadFeaturedTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Featured: ', data.entities);
  return data.entities;
});

const uploadSpecialTrainings = createAsyncThunk<
  Trainings,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadSpecialTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Special: ', data.entities);
  return data.entities;
});

const uploadPopularTrainings = createAsyncThunk<
  Trainings,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadPopularTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Popular: ', data.entities);
  return data.entities;
});


export {
  uploadTrainings,
  uploadFeaturedTrainings,
  uploadSpecialTrainings,
  uploadPopularTrainings
};
