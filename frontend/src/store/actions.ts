import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export { redirectToRoute };
