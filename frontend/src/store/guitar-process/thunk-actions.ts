import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { Guitar } from '../../types/guitars';


const uploadGuitarById = createAsyncThunk<
  Guitar | void,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadGuitarById', async (guitarId, { extra: api }) => {
  const { data } = await api.get<Guitar>(
      `${ApiRoute.Guitars}/${guitarId}`,
    );
    return data;

});



export {
  uploadGuitarById
}
