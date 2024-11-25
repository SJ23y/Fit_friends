import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getPurchases = (state: Pick<State, NameSpace.PURCHASE>) => (state[NameSpace.PURCHASE].purchases);

const getOrders = (state: Pick<State, NameSpace.PURCHASE>) => (state[NameSpace.PURCHASE].coachOrders);

const getTrainingPurchase = (state: Pick<State, NameSpace.PURCHASE>) => (state[NameSpace.PURCHASE].currentTrainingPurchase);

const getPurchaseLoadingStatus = (state: Pick<State, NameSpace.PURCHASE>) =>
  (state[NameSpace.PURCHASE].loadingStatus);

export {
  getPurchases,
  getTrainingPurchase,
  getOrders,
  getPurchaseLoadingStatus
};
