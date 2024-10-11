import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import IntroPage from '../../pages/intro/intro.page';
import { AppRoute } from '../../consts';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import QuestionnaireUser from '../../pages/questionnaire-user/questionnaire-user';
import Main from '../../pages/main/main';
import PersonalAccount from '../../pages/personal-account/personal-account';
import MyOrders from '../../pages/my-orders/my-orders';
import TrainingCatalog from '../../pages/training-catalog/training-catalog';
import TrainingPage from '../../pages/training-page/training-page';


function App(): JSX.Element {
  /*const isError = useAppSelector(getErrorStatus);

  if (isError) {
    return <ErrorScreen />;
  }
*/
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<IntroPage />} />

          <Route path={AppRoute.Login} element={<Login />} />


            <Route path={AppRoute.Register} element={<Register />} />

            <Route path={AppRoute.Trainings} element={<TrainingCatalog />} />

            <Route
              path={AppRoute.Questionnaire}
              element={
                <PrivateRoute>
                  <QuestionnaireUser />
                </PrivateRoute>
              }
            />

            <Route
              path={AppRoute.Main}
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />

            <Route
              path={AppRoute.Account}
              element={
                <PrivateRoute>
                  <PersonalAccount />
                </PrivateRoute>
              }
            />

            <Route
              path={AppRoute.Orders}
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />

            <Route
              path={`${AppRoute.Training}/:trainingId`}
              element={
                <PrivateRoute>
                  <TrainingPage />
                </PrivateRoute>
              }
            />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
