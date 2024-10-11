import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks/use-app-dispatch';
import { checkAuthentication } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(checkAuthentication);
  return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
