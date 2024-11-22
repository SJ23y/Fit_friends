import { NameSpace } from '../../consts';
import { generateMockTraining } from '../../mock-data/mock-trainings';
import { getCurrentTraining, getTrainingLoadingStatus } from './selectors';

describe('Training-process selectors', () => {
  const state = {
    [NameSpace.TRAINING]: {
        currentTraining: generateMockTraining(),
        loadingStatus: false
      }
  };

  it('Should return currentTraining from the State', () => {
    const { currentTraining } = state[NameSpace.TRAINING];

    const result = getCurrentTraining(state);

    expect(result).toEqual(currentTraining);
  });

  it('Should return loadingStatus from the State', () => {
    const { loadingStatus } = state[NameSpace.TRAINING];

    const result = getTrainingLoadingStatus(state);

    expect(result).toEqual(loadingStatus);
  });
});
