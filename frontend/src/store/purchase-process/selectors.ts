import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getPurchases = (state: Pick<State, NameSpace.PURCHASE>) =>
  state[NameSpace.PURCHASE].purchases;

const getTrainingPurchase = (state: Pick<State, NameSpace.PURCHASE>) =>
  state[NameSpace.PURCHASE].currentTrainingPurchase;

export {
  getPurchases,
  getTrainingPurchase
};
