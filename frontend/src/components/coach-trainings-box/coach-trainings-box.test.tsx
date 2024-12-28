import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { AuthorizationStatus, Setting } from '../../consts';
import CoachTrainingsBox from './coach-trainings-box';
import { generateMockTraining } from '../../mock-data/mock-trainings';

describe('Component: CoachTrainingsBox', () => {
    const initialState ={
      USER: {
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
      }
  };

    const componentProps = {
      trainings: Array.from({length: 5}, () => generateMockTraining())
    }

    const { withStoreComponent } = withStore(<CoachTrainingsBox {...componentProps}  />, {...initialState});
    const preparedComponent = withHistory(withStoreComponent);

  it('check for keywords', () => {
    const headlineText = /Тренировки/i;
   
    render(preparedComponent);

    expect(screen.getByText(headlineText)).toBeInTheDocument();
  });

  it('should render correct number of trainings', async () => {    
    const trainingTestId = 'trainingElement';
    const expectedLength = (componentProps.trainings.length > Setting.PopularCardPerStep) ? Setting.PopularCardPerStep : componentProps.trainings.length
    render(preparedComponent);

    expect(screen.getAllByTestId(trainingTestId)).toHaveLength(expectedLength);        
  });

  it('should render correct with empty trainings', async () => {    
    const expectedText = /Скоро тут появится что-то полезное/i;
    componentProps.trainings = [];
    const { withStoreComponent } = withStore(<CoachTrainingsBox {...componentProps}  />, {...initialState});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();        
  });
});