import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { PaginatedResult } from '../../types/paginatedResult';
import { NewPurchase, Purchase } from '../../types/purchase';
import { createQueryString } from '../../utils';
import { Query } from '../../types/query';

const uploadPurchases = createAsyncThunk<
  PaginatedResult<Purchase>,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadPurchases', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Purchase>>(`${ApiRoute.Purchases}?${createQueryString(query)}`);
  console.log('Purchases data: ', data);
  return data;
});

const uploadPurchaseByTrainingId = createAsyncThunk<
  Purchase,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadPurchaseByTrainingId', async (trainingId, { extra: api }) => {
  const { data } = await api.get<Purchase>(`${ApiRoute.Purchases}/${trainingId}`);
  console.log('Purchase data: ', data);
  return data;
});

const addNewPurchase = createAsyncThunk<
Purchase,
  {
    newPurchase: NewPurchase,
    cb: () => void
  },
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('addNewPurchase', async ({newPurchase, cb}, { extra: api }) => {
  const { data } = await api.post<Purchase>(ApiRoute.Purchases, newPurchase);
  cb();
  return data;
});

const reducePurchaseTrainings = createAsyncThunk<
  Purchase,
  { purchaseId: string,
    trainId: string,
    trainCount: number
  },
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('reducePurchaseTrainings', async ({purchaseId, trainId, trainCount}, { extra: api }) => {
  const { data } = await api.patch<Purchase>(`${ApiRoute.Purchases}/${purchaseId}`, {trainId, trainCount});
  console.log('Purchase data: ', data);
  return data;
});

export {
  uploadPurchases,
  addNewPurchase,
  uploadPurchaseByTrainingId,
  reducePurchaseTrainings
};
