import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { Guitars } from '../../types/guitars';

const uploadGuitars = createAsyncThunk<
  Guitars,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadGuitars', async (_args, { extra: api }) => {
  const { data } = await api.get<Guitars>(`${ApiRoute.Guitars}`);
  console.log('Data: ', data)
  return data;
});


export {
  uploadGuitars
};
