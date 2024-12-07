import { memo } from "react";
import { Link } from "react-router-dom";
import { AppRoute, Role, Setting } from "../../consts";
import { UserData } from "../../types/auth";
import classNames from "classnames";

type UserListCardProps = {
  user: UserData
}

function UserListCardTemplate({user}: UserListCardProps): JSX.Element {

  return(
    <div className={
      classNames({
        "thumbnail-user  ": true,
        "thumbnail-user--role-user": user.role === Role.USER,
        "thumbnail-user--role-coach thumbnail-user--dark" : user.role === Role.COACH
      })
    }>
      <div className="thumbnail-user__image">
        <picture>
          <img src={`${Setting.BaseUrl}/${user.avatar}`} width="82" height="82" alt="" />
        </picture>
      </div>
      {/*<div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
        <svg width="12" height="12" aria-hidden="true">
          <use xlinkHref="#icon-crown"></use>
        </svg>
      </div>*/}
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{user.location}</address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {
          user.questionnaire &&
          user.questionnaire.trainType.map((type) => (
            <li className="thumbnail-user__hashtags-item" key={`type--${type}-${user.id}`}>
              <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
            </li>
          ))
        }
      </ul>
      <Link
        className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
        to={`${AppRoute.User}/${user.id}`}
      >Подробнее</Link>
    </div>
  );
}

const UserListCard = memo(UserListCardTemplate);

export default UserListCard;
