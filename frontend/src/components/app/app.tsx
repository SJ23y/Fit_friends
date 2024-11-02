import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import IntroPage from '../../pages/intro/intro.page';
import { AppRoute } from '../../consts';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';

import Main from '../../pages/main/main';
import PersonalAccount from '../../pages/personal-account/personal-account';
import MyOrders from '../../pages/my-orders/my-orders';
import TrainingCatalog from '../../pages/training-catalog/training-catalog';
import TrainingPage from '../../pages/training-page/training-page';
import Layout from '../layout/layout';
import MyPurchases from '../../pages/my-purchases/my-purchases';
import CreateTrainingForm from '../../pages/create-training-form/create-training-form';
import MyTrainings from '../../pages/my-trainings/my-trainings';
import UserCard from '../../pages/user-card/user-card';
import { useAppSelector } from '../../hooks/use-app-dispatch';
import { getUserLoadingStatus } from '../../store/user-process/selectors';
import Questionnaire from '../../pages/questionnaire/questuinaire';

function App(): JSX.Element {
  const userLoadingStatus = useAppSelector(getUserLoadingStatus);

  return (
    <HelmetProvider>
      { userLoadingStatus && <span>Loading ...</span> }
      { !userLoadingStatus &&
      <BrowserRouter>
        <Routes>
          <Route path="" element={<IntroPage />} />

          <Route path={AppRoute.Login} element={<Login />} />


            <Route path={AppRoute.Register} element={<Register />} />

            <Route
              path={AppRoute.Questionnaire}
              element={
                <PrivateRoute>
                  <Questionnaire />
                </PrivateRoute>
              }
            />

            <Route path="" element={<Layout />}>
              <Route
                path={AppRoute.Main}
                element={
                  <PrivateRoute>
                    <Main />
                  </PrivateRoute>
                }
              />

              <Route path={AppRoute.Trainings} element={<TrainingCatalog />} />

              <Route
                path={AppRoute.Account}
                element={
                  <PrivateRoute>
                    <PersonalAccount />
                  </PrivateRoute>
                }
              />

              <Route
                path={AppRoute.CoachTrainings}
                element={
                  <PrivateRoute>
                    <MyTrainings />
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
                path={AppRoute.Purchases}
                element={
                  <PrivateRoute>
                    <MyPurchases />
                  </PrivateRoute>
                }
              />

              <Route
                path={AppRoute.Purchases}
                element={
                  <PrivateRoute>
                    <MyPurchases />
                  </PrivateRoute>
                }
              />

              <Route
                path={AppRoute.NewTraining}
                element={
                  <PrivateRoute>
                    <CreateTrainingForm />
                  </PrivateRoute>
                }
              />

              <Route
                path={`${AppRoute.User}/:userId`}
                element={
                  <PrivateRoute>
                    <UserCard />
                  </PrivateRoute>
                }
            />
          </Route>

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
    }

    </HelmetProvider>
  );
}

export default App;
