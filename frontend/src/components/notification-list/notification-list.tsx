import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getNotifications, getNotificationsLoadingStatus } from "../../store/notification-process/selectors";
import { deleteNotification } from "../../store/notification-process/thunk-actions";
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
    </div>
  )
}

export default NotificationList;
