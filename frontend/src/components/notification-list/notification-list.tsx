import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getNotifications, getNotificationsLoadingStatus } from "../../store/notification-process/selectors";
import { useEffect } from "react";
import { deleteNotification, uploadNotifications } from "../../store/notification-process/thunk-actions";
import { Setting } from "../../consts";
import { parseDate } from "../../utils";

function NotificationList(): JSX.Element {
  const notifications = useAppSelector(getNotifications);
  const loadingStatus = useAppSelector(getNotificationsLoadingStatus);
  const dispatch = useAppDispatch();

  const notificationClickHandler = (notificationId: string) => {
    dispatch(deleteNotification(notificationId));
  }

  return(
    <div className="main-nav__dropdown">
      <p className="main-nav__label">Оповещения</p>
      {
        loadingStatus &&
        <p>Loading...</p>
      }
      {
          !loadingStatus &&
          notifications &&
          notifications.length > 0 &&
          <ul className="main-nav__sublist">
            {
              notifications
                .slice(0, Setting.MaxNotificationListElements)
                .map((notification) => (
                  <li className="main-nav__subitem" key={`notification-${notification.id}`}>
                    <Link
                      className="notification is-active"
                      to="#"
                      onClick={() => notificationClickHandler(notification.id)}
                    >
                      <p className="notification__text">{notification.text}</p>
                      <time
                        className="notification__time"
                        dateTime={parseDate(notification.createdAt, Setting.NotificationAttributeDateFormat)}
                      >
                        {parseDate(notification.createdAt, Setting.NotificationHumanDateFormat)}
                      </time>
                    </Link>
                  </li>
                ))
              }
          </ul>
        }
        {
          !loadingStatus &&
          notifications?.length === 0 &&
          <p> Новые уведомления осуствуют </p>
        }

        {/*
                        <li className="main-nav__subitem">
                          <Link className="notification is-active" to="#">
                            <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                            <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time>
                          </Link>
                        </li>
                        <li className="main-nav__subitem">
                          <Link className="notification is-active" to="#">
                            <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                            <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time>
                          </Link>
                        </li>
                        <li className="main-nav__subitem">
                          <Link className="notification" to="#">
                            <p className="notification__text">Наталья приняла приглашение на&nbsp;совместную тренировку</p>
                            <time className="notification__time" dateTime="2023-12-14 08:15">14 декабря, 08:15</time>
                          </Link>
                        </li>*/
        }
    </div>
  )
}

export default NotificationList;
