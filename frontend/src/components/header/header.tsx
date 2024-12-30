import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "../../consts";
import classNames from "classnames";
import { memo } from "react";
import NotificationList from "../notification-list/notification-list";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { uploadNotifications } from "../../store/notification-process/thunk-actions";

function HeaderTemplate(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const notificationsLinkHoverHandler = () => {
    dispatch(uploadNotifications());
  }

  return(
    <header className="header">
        <div className="container">
          <span className="header__logo">
            <svg width="187" height="70" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </span>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link
                  className={classNames({
                    "main-nav__link ": true,
                    "is-active": location.pathname === AppRoute.Main
                  })}
                  to={AppRoute.Main}
                  aria-label="На главную"
                >
                  <svg width="18" height="18" aria-hidden="true">
                    <use xlinkHref="#icon-home"></use>
                  </svg>
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className={classNames({
                    "main-nav__link ": true,
                    "is-active": location.pathname === AppRoute.Account
                  })}
                  to={AppRoute.Account}
                  aria-label="Личный кабинет"
                >
                  <svg width="16" height="18" aria-hidden="true">
                    <use xlinkHref="#icon-user"></use>
                  </svg>
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className={classNames({
                    "main-nav__link ": true,
                    "is-active": location.pathname === AppRoute.Friends
                  })}
                  to={AppRoute.Friends}
                  aria-label="Друзья"
                >
                  <svg width="22" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-friends"></use>
                  </svg>
                </Link>
              </li>
              <li className="main-nav__item main-nav__item--notifications">
                <Link
                  className="main-nav__link" to="#"
                  aria-label="Уведомления"
                  onMouseEnter={notificationsLinkHoverHandler}
                >
                  <svg width="14" height="18" aria-hidden="true">
                    <use xlinkHref="#icon-notification"></use>
                  </svg>
                </Link>
                <NotificationList />
              </li>
            </ul>
          </nav>
          <div className="search">
            <form action="#" method="get">
              <label>
                <span className="search__label">Поиск</span>
                <input type="search" name="search" />
                <svg className="search__icon" width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-search"></use>
                </svg>
              </label>
              <ul className="search__list">
                <li className="search__item"><Link className="search__link" to="#">Бокс</Link></li>
                <li className="search__item"><Link className="search__link is-active" to="#">Бег</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Аэробика</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
                <li className="search__item"><Link className="search__link" to="#">Text</Link></li>
              </ul>
            </form>
          </div>
        </div>
      </header>
  );
}

const Header = memo(HeaderTemplate);

export default Header;
