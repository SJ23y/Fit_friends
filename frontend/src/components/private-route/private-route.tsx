import { useAppSelector } from '../../hooks/use-app-dispatch';
import { checkAuthentication } from '../../store/user-process/selectors';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children}: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(checkAuthentication)
  return (isAuth ? children : <Navigate to={AppRoute.Intro} />)
}

export default PrivateRoute;
