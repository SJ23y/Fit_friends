import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-data/mock-component';
import CoachAccountContent from './coach-account-content';
import { generateMockUser } from '../../mock-data/mock-users';
import { AuthorizationStatus, Setting } from '../../consts';

describe('Component: CoachAccountContent', () => {
    
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
    error: null,
    loadingStatus: false,
    currentlyViewedUser: null,
    users: null,
    query: {
      count: Setting.MaxUserCatalogCount,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection,
      page: Setting.DefaultStartPage
    }
  };

  let userData = generateMockUser();  

  const { withStoreComponent } = withStore(<CoachAccountContent user={userData} />, {USER: {...initialState}});
  const preparedComponent = withHistory(withStoreComponent);


  it('check for keywords', () => {
    const myTrainingsText = /Мои тренировки/i;
    const createTrainingText = /Создать тренировку/i;
    const myFriendsText = /Мои друзья/i;
    const myOrdersText = /Мои заказы/i;    

    render(preparedComponent);

    expect(screen.getByText(myTrainingsText)).toBeInTheDocument();
    expect(screen.getByText(createTrainingText)).toBeInTheDocument();
    expect(screen.getByText(myFriendsText)).toBeInTheDocument();
    expect(screen.getByText(myOrdersText)).toBeInTheDocument();    
  });
});