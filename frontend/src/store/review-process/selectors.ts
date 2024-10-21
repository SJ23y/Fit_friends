import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getReviews = (state: Pick<State, NameSpace.REVIEW>) =>
  state[NameSpace.REVIEW].reviews;



export {
  getReviews
};
