import { NameSpace } from '../../consts';
import { generateMockUser } from '../../mock-data/mock-users';
import { getFriends } from './selectors';

describe('Friend-process selectors', () => {
  const state = {
    [NameSpace.FRIEND]: {
      friends: {
        entities: Array.from({length: 5}, () => ({...generateMockUser(), 'trainingRequests': true, 'trainTypes': []})),
        totalPages: 2,
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 6        
      }
    },
  };

  it('Should return friends from the State', () => {
    const { friends } = state[NameSpace.FRIEND];

    const result = getFriends(state);

    expect(result).toEqual(friends);
  });
});
