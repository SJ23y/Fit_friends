import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getCurrentGuitar = (state: Pick<State, NameSpace.GUITAR>) => state[NameSpace.GUITAR].currentGuitar;

export { getCurrentGuitar };
