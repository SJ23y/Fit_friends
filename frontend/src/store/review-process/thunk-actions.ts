import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { PaginatedResult } from '../../types/paginatedResult';
import { createQueryString } from '../../utils';
import { Query } from '../../types/query';
import { NewReview, Review } from '../../types/review';

const uploadReviews = createAsyncThunk<
  PaginatedResult<Review>,
  {
    trainingId: string,
    query: Query
  },
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadReviews', async ({trainingId, query}, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Review>>(`${ApiRoute.Reviews}/${trainingId}?${createQueryString(query)}`);
  console.log('Reviews data: ', data);
  return data;
});

const addNewReview = createAsyncThunk<
  Review,
  {
    newReview: NewReview,
    cb: () => void
  },
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('addNewReview', async ({newReview, cb}, { extra: api }) => {
  const { data } = await api.post<Review>(ApiRoute.Reviews, newReview);
  cb();
  return data;
});

export {
  uploadReviews,
  addNewReview
};
