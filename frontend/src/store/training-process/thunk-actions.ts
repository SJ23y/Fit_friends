import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { Training } from '../../types/trainings';


const addNewTraining = createAsyncThunk<
  Training,
  FormData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('addNewTraining', async (newTraining, { extra: api }) => {

  const { data } = await api.post<Training>(ApiRoute.Trainings, newTraining);

  return data;
});

const uploadTrainingById = createAsyncThunk<
  Training | void,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadTrainingById', async (trainingId, { extra: api }) => {
  const { data } = await api.get<Training>(
      `${ApiRoute.Trainings}/${trainingId}`,
    );
    return data;
});



export {
  uploadTrainingById,
  addNewTraining
}
