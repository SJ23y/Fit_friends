import { NameSpace } from '../../consts';
import { State } from '../../types/state';

const getNotifications = (state: Pick<State, NameSpace.NOTIFICATION>) =>
  state[NameSpace.NOTIFICATION].notifications;

const getNotificationsLoadingStatus = (state: Pick<State, NameSpace.NOTIFICATION>) =>
  state[NameSpace.NOTIFICATION].loadingStatus;

export {
  getNotifications,
  getNotificationsLoadingStatus
};
