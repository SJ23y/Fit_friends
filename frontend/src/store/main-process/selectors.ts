import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getInitialGuitars = (state: Pick<State, NameSpace.GUITARS>) =>
  state[NameSpace.GUITARS].initialGuitars;

const getQuery = (state: Pick<State, NameSpace.GUITARS>) =>
  state[NameSpace.GUITARS].query;

const getErrorStatus = (state: Pick<State, NameSpace.GUITARS>) =>
  state[NameSpace.GUITARS].errorStatus;

export {
  getInitialGuitars,
  getQuery,
  getErrorStatus,
};
