import { AuthorizationStatus, NameSpace } from '../../consts';
import { UserData } from '../../types/auth';
import { State } from '../../types/state';

const getAuthorizationStatus = (
  state: Pick<State, NameSpace.USER>,
): AuthorizationStatus => state[NameSpace.USER].authorizationStatus;
const checkAuthentication = (state: Pick<State, NameSpace.USER>): boolean =>
  state[NameSpace.USER].authorizationStatus === AuthorizationStatus.Auth;
const getUserInfo = (state: Pick<State, NameSpace.USER>): UserData | null =>
  state[NameSpace.USER].user;

export { getAuthorizationStatus, checkAuthentication, getUserInfo };
