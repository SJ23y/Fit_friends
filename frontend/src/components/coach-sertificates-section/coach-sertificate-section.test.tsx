import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { AuthorizationStatus, Setting } from '../../consts';
import CoachSertificatesSection from './coach-sertificate-section';

describe('Component: CoachSertificatesSection', () => {
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

    const componentProps = {
      sertificates: ['sertificate1', 'sertificate2', 'sertificate3']
    }

    const { withStoreComponent } = withStore(<CoachSertificatesSection {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);

  it('check for keywords', () => {
    const headlineText = /Дипломы и сертификаты/i;
    const uploadButtonText = /Загрузить/i
   
    render(preparedComponent);

    expect(screen.getByText(headlineText)).toBeInTheDocument();
    expect(screen.getByText(uploadButtonText)).toBeInTheDocument();
  });

  it('should render correct number of sertificates', async () => {    

    render(preparedComponent);

    componentProps.sertificates.forEach((sertificate) => {
      expect(screen.getByTestId(sertificate)).toBeInTheDocument();
    });    
  });

  it('should render correct with empty sertificates', async () => {    
    componentProps.sertificates = [];
    const expectedText = /Скоро тут будет интересно/i
    const { withStoreComponent } = withStore(<CoachSertificatesSection {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument(); 
  });

});