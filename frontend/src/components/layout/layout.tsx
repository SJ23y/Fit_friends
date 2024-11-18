import { memo } from "react";
import Header from "../header/header";
import { Outlet, useLocation} from "react-router-dom";
import './style.min.css';
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import { AppRoute } from "../../consts";

function LayoutTemplate(): JSX.Element {
  const {pathname} = useLocation();
  return(
    <>
      <Helmet>
        <title>
          Fitfriends |
          {classNames({
            " Главная": pathname === AppRoute.Main,
            " Новая тренировка": pathname === AppRoute.NewTraining,
            " Мои заказы": pathname === AppRoute.Orders,
            " Мои покупки": pathname === AppRoute.Purchases,
            " Мои тренировки": pathname === AppRoute.CoachTrainings,
            " Личный кабинет": pathname === AppRoute.Account,
            " Каталог тренировок": pathname === AppRoute.Trainings,
            " Карточка пользователя": pathname.startsWith(AppRoute.User)
          })}
        </title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

const Layout = memo(LayoutTemplate);

export default Layout;
