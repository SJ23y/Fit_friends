import { memo } from "react"
import { Friend } from "../../types/auth";
import { AppRoute, Role, Setting } from "../../consts";
import classNames from "classnames";
import { Link } from "react-router-dom";

type FriendCardProps = {
  friend: Friend
}

function FriendCardTemplate({friend}: FriendCardProps): JSX.Element {
  return(
      <div className="thumbnail-friend">
        <div className={
          classNames({
            "thumbnail-friend__info " : true,
            "thumbnail-friend__info--theme-light": friend.role === Role.USER,
            "thumbnail-friend__info--theme-dark": friend.role === Role.COACH
          })
        }>
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
            <Link to={`${AppRoute.User}/${friend.id}`}>
              <picture>
                <img src={`${Setting.BaseUrl}/${friend.avatar}`} width={78} height={78} alt={`friend-${friend.name}-image`} />
              </picture>
            </Link>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{friend.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width={14} height={16} aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">{friend.location}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {friend.trainTypes.map((type, index) => (
              <li key={`friend-trainType-${type}-${index}`}>
                <div className="hashtag thumbnail-friend__hashtag"><span>#{type}</span></div>
              </li>
            ))}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className={
              classNames({
                "thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready": true,
                "thumbnail-friend__ready-status--is-ready": friend.trainingRequests,
                "thumbnail-friend__ready-status--is-not-ready": !friend.trainingRequests,
              })
            }>
              <span>
                {(friend.trainingRequests) ? 'Готов к тренировке' : 'Не готов к тренировке'}
              </span>
            </div>
            {
              friend.trainingRequests &&
              friend.role === Role.USER &&
              <button
                className="thumbnail-friend__invite-button"
                type="button"
              >
                <svg width={43} height={46} aria-hidden="true" focusable="false">
                  <use xlinkHref="#icon-invite" />
                </svg>
                <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
              </button>
            }

          </div>
        </div>
        {
          friend.trainingRequests &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
            <div className="thumbnail-friend__button-wrapper">
              <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
              <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
            </div>
          </div>
        }
      </div>
  )
}

const FriendCard = memo(FriendCardTemplate);

export default FriendCard;
