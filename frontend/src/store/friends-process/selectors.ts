import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getFriends = (state: Pick<State, NameSpace.FRIEND>) => state[NameSpace.FRIEND].friends;

export { getFriends };
