import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute, AppRoute } from '../../consts';
import { Training } from '../../types/trainings';
import { redirectToRoute } from '../actions';


const addNewTraining = createAsyncThunk<
  Training,
  FormData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('addNewTraining', async (newTraining, { dispatch, extra: api }) => {

  const { data } = await api.post<Training>(ApiRoute.Trainings, newTraining);
  dispatch(redirectToRoute(AppRoute.CoachTrainings));
  return data;
});

const updateTraining = createAsyncThunk<
  Training,
  {newTraining: FormData, trainingId: string},
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('updateTraining', async ({newTraining, trainingId}, { extra: api }) => {

  const { data } = await api.post<Training>(`${ApiRoute.Trainings}/update/${trainingId}`, newTraining);

  return data;
});

const uploadTrainingById = createAsyncThunk<
  Training | void,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadTrainingById', async (trainingId, { extra: api }) => {
  const { data } = await api.get<Training>(`${ApiRoute.Trainings}/${trainingId}`);
    return data;
});



export {
  uploadTrainingById,
  addNewTraining,
  updateTraining
}
