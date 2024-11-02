import { memo } from "react"
import { UserData } from "../../types/auth"
import { Link } from "react-router-dom"
import { AppRoute } from "../../consts"

type UserAccountContentProps = {
  user: UserData
}

function UserAccountContentTemplate({user}: UserAccountContentProps): JSX.Element {
  return(
    <div className="inner-page__content">
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на день, ккал</span>
                <input
                  type="text"
                  name="schedule-for-the-day"
                  defaultValue={user.questionnaire.caloriePerDay}
                />
              </label>
            </div>
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на неделю, ккал</span>
                <input
                  type="text"
                  name="schedule-for-the-week"
                  defaultValue={user.questionnaire.caloriePerDay * 7}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        <Link className="thumbnail-link thumbnail-link--theme-light" to="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.Purchases}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-shopping-cart"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои покупки</span>
        </Link>
      </div>
    </div>

  </div>
  )
}

const UserAccountContent = memo(UserAccountContentTemplate);

export default UserAccountContent;
