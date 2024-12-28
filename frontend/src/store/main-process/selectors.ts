import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getTrainings = (state: Pick<State, NameSpace.MAIN>) =>
  state[NameSpace.MAIN].trainings;

const getSpecialTrainings = (state: Pick<State, NameSpace.MAIN>) =>
  state[NameSpace.MAIN].specialTrainings;

const getPopularlTrainings = (state: Pick<State, NameSpace.MAIN>) =>
  state[NameSpace.MAIN].popularTrainings;

const getFeaturedTrainings = (state: Pick<State, NameSpace.MAIN>) =>
  state[NameSpace.MAIN].featuredTrainings;

const getQuery = (state: Pick<State, NameSpace.MAIN>) =>
  state[NameSpace.MAIN].query;

const getErrorStatus = (state: Pick<State, NameSpace.MAIN>) =>
  state[NameSpace.MAIN].errorStatus;

const getMainLoadingStatus = (state: Pick<State, NameSpace.MAIN>) =>
  state[NameSpace.MAIN].loadingStatus;

export {
  getTrainings,
  getFeaturedTrainings,
  getSpecialTrainings,
  getQuery,
  getErrorStatus,
  getPopularlTrainings,
  getMainLoadingStatus
};
