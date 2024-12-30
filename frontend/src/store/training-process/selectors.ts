import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getCurrentTraining = (state: Pick<State, NameSpace.TRAINING>) => state[NameSpace.TRAINING].currentTraining;

const getTrainingLoadingStatus = (state: Pick<State, NameSpace.TRAINING>) => state[NameSpace.TRAINING].loadingStatus;

const getTrainingErrorStatus = (state: Pick<State, NameSpace.TRAINING>) => state[NameSpace.TRAINING].error;

export { getCurrentTraining, getTrainingLoadingStatus, getTrainingErrorStatus };
