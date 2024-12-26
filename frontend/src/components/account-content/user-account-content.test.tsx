import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { generateMockUser } from '../../mock-data/mock-users';
import UserAccountContent from './user-account-content';
import { AuthorizationStatus, Setting } from '../../consts';

describe('Component: UserAccountContent', () => {
  
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

  const { withStoreComponent } = withStore(<UserAccountContent user={userData} />, {USER: {...initialState}});
  const preparedComponent = withHistory(withStoreComponent);


  it('check for keywords', () => {
    const dayPlanText = /План на день, ккал/i;
    const weekPlanText = /План на неделю, ккал/i;
    const myFriendsText = /Мои друзья/i;
    const myPurchacesText = /Мои покупки/i;    

    render(preparedComponent);

    expect(screen.getByText(dayPlanText)).toBeInTheDocument();
    expect(screen.getByText(weekPlanText)).toBeInTheDocument();
    expect(screen.getByText(myFriendsText)).toBeInTheDocument();
    expect(screen.getByText(myPurchacesText)).toBeInTheDocument();    
  });
});