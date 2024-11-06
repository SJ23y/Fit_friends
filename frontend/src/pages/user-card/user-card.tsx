import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getUserCardInfo } from "../../store/user-process/selectors";
import { useEffect } from "react";
import { getUserById } from "../../store/user-process/thunk-actions";
import { Role, Setting } from "../../consts";
import { isCoachQuestionnaire } from "../../utils";
import CoachTrainingsBox from "../../components/coach-trainings-box/coach-trainings-box";
function UserCard(): JSX.Element {
  const user = useAppSelector(getUserCardInfo);
  const {userId} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (userId && user?.id !== userId) {
      dispatch(getUserById(userId));
    }
  }, [])

  return(
    <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                className="btn-flat inner-page__back"
                type="button"
                onClick={() => navigate(-1)}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                {
                  user?.role === Role.COACH &&
                  <section className="user-card-coach">
                    <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                    <div className="user-card-coach__wrapper">
                      <div className="user-card-coach__card">
                        <div className="user-card-coach__content">
                          <div className="user-card-coach__head">
                            <h2 className="user-card-coach__title">{user.name}</h2>
                          </div>
                          <div className="user-card-coach__label">
                            <Link to="#">
                              <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <span>{user.location}</span>
                            </Link>
                          </div>
                          <div className="user-card-coach__status-container">
                            <div className="user-card-coach__status user-card-coach__status--tag">
                              <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg>
                              <span>Тренер</span>
                            </div>
                            {
                              isCoachQuestionnaire(user.questionnaire) &&
                              user.questionnaire.individualTraining &&
                              <div className="user-card-coach__status user-card-coach__status--check">
                                <span>Готов тренировать</span>
                              </div>
                            }
                          </div>

                          <div className="user-card-coach__text">
                            <p>{user.description}</p>
                            <p>Провожу как индивидуальные тренировки, так и&nbsp;групповые занятия. Помогу вам достигнуть своей цели и&nbsp;сделать это с&nbsp;удовольствием!</p>
                          </div>
                          {
                            /*
                            <button className="btn-flat user-card-coach__sertificate" type="button">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-teacher"></use>
                              </svg><span>Посмотреть сертификаты</span>
                            </button>*/
                          }
                          <ul className="user-card-coach__hashtag-list">
                            {
                              user.questionnaire.trainType.map((type, index) => (
                                <li className="user-card-coach__hashtag-item" key={`hashtag-type-${index}`}>
                                  <div className="hashtag"><span>#{type}</span></div>
                                </li>
                              ))
                            }
                          </ul>
                          <button className="btn user-card-coach__btn" type="button">
                            Добавить в друзья
                          </button>
                        </div>
                        <div className="user-card-coach__gallary">
                          <ul className="user-card-coach__gallary-list">
                            <li className="user-card-coach__gallary-item">
                              <img src={`${Setting.BaseUrl}/${user.avatar}`} width="334" height="573" alt="photo1" />
                            </li>
                            <li className="user-card-coach__gallary-item">
                              <img src={`${Setting.BaseUrl}/${user.backgroundImage}`} width="334" height="573" alt="photo2" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      {

                        user.trainings &&
                        <CoachTrainingsBox
                          trainings={user.trainings}
                          indiviDualTrainings={isCoachQuestionnaire(user.questionnaire) && user.questionnaire.individualTraining}
                        />
                      }
                    </div>
                  </section>
                }
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}

export default UserCard;
