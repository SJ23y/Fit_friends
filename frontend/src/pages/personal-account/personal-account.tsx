import { Link } from "react-router-dom";
import UserInfoSection from "../../components/user-info-section/user-info-section";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { getUserInfo } from "../../store/user-process/selectors";
import { AppRoute } from "../../consts";

function PersonalAccount(): JSX.Element {
  const user = useAppSelector(getUserInfo);

  return(
      <main>
        {
          user &&
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Личный кабинет</h1>
                <UserInfoSection user={user} />

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
              </div>
            </div>
          </section>
        }
      </main>
  )
}


export default PersonalAccount;
