import { AppRoute } from '../../consts';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../actions';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('Should redirect to /favorites with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Favorites);

    store.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.Favorites);
  });

  it('Should not redirect to /login with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Login };

    store.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
