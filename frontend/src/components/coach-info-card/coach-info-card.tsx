import { Link } from "react-router-dom";
import { RequestStatus, Setting } from "../../consts";
import { UserData } from "../../types/auth";
import { isCoachQuestionnaire } from "../../utils";
import CoachTrainingsBox from "../coach-trainings-box/coach-trainings-box";
import { memo, useState } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { sendTrainingRequest } from "../../store/friends-process/thunk-actions";
import { addNewRequest } from "../../store/user-process/user-process";
import classNames from "classnames";
import SertificatesPopup from "../sertificates-popup/sertificates-popup";

type CoachInfoCardProps = {
  user: UserData,
  onAddFriend: () => void,
  onDeleteFriend: () => void,
  isFriend: boolean,
  isReadyForTraining: boolean,
  loggedUserId: string,
  hasSubscription: boolean,
  onSubscriptionChange: (coachId: string, coachName: string) => void
}

function CoachInfoCardTemplate({
  loggedUserId,
  user,
  onAddFriend,
  onDeleteFriend,
  isFriend,
  isReadyForTraining,
  hasSubscription,
  onSubscriptionChange
}: CoachInfoCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [sertificatesPopupStatus, setSertificatesPopupStatus] = useState(false);

  const keyDownClickHandler = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      setSertificatesPopupStatus(false);
    }
  }

  const personalTrainingBtnClickHandler = () => {
    const newRequest = {
      senderId: loggedUserId,
      recieverId: user.id,
      status: RequestStatus.PENDING
    }
    dispatch(
      sendTrainingRequest({
        ...newRequest,
        cb: () => {
          dispatch(addNewRequest(newRequest))
        }
      })
    );
  }


  return(
    <div
        className={
          classNames({
            "wrapper": true,
            "modal-open": sertificatesPopupStatus
          })
        }
        onKeyDown={keyDownClickHandler}
    >

      <div className="inner-page__content">
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
                              {
                                isCoachQuestionnaire(user.questionnaire) &&
                                !user.questionnaire.individualTraining &&
                                <div className="user-card-coach-2__status user-card-coach-2__status--check">
                                  <span>Не готов тренировать</span>
                                </div>
                              }
                            </div>

                            <div className="user-card-coach__text">
                              <p>{user.description}</p>
                              <p>
                                {isCoachQuestionnaire(user.questionnaire) && user.questionnaire.description}
                              </p>
                            </div>
                            {
                              user.sertificates &&
                              user.sertificates?.length > 0 &&
                              <button
                                className="btn-flat user-card-coach__sertificate"
                                type="button"
                                onClick={() => setSertificatesPopupStatus(true)}
                              >
                                <svg width="12" height="13" aria-hidden="true">
                                  <use xlinkHref="#icon-teacher"></use>
                                </svg>
                                <span>Посмотреть сертификаты</span>
                              </button>
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
                            {
                              !isFriend &&
                              <button
                                className="btn user-card-coach__btn"
                                type="button"
                                onClick={onAddFriend}
                              >
                                Добавить в друзья
                              </button>
                            }
                            {
                              isFriend &&
                              <button
                                className="btn btn--outlined user-card-coach-2__btn"
                                type="button"
                                onClick={onDeleteFriend}
                              >
                                Удалить из друзей
                              </button>
                            }

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
                        <div className="user-card-coach__training">
                        {

                          user.trainings &&
                          <CoachTrainingsBox
                            trainings={user.trainings}
                            indiviDualTrainings={isCoachQuestionnaire(user.questionnaire) && user.questionnaire.individualTraining}
                          />
                        }
                        <form className="user-card-coach__training-form">
                            {
                              isCoachQuestionnaire(user.questionnaire) &&
                              user.questionnaire.individualTraining &&
                              isReadyForTraining &&
                              isFriend &&
                              <button
                                className="btn user-card-coach__btn-training"
                                type="button"
                                onClick={personalTrainingBtnClickHandler}
                              >
                                Хочу персональную тренировку
                              </button>
                            }
                            {

                              <div className="user-card-coach__training-check">
                                <div className="custom-toggle custom-toggle--checkbox">
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="user-agreement-1"
                                      name="user-agreement"
                                      checked={hasSubscription}
                                      onChange={() => onSubscriptionChange(user.id, user.name)}
                                      data-testid="personalTrainingCheckbox"
                                      />
                                    <span className="custom-toggle__icon">
                                      <svg width="9" height="6" aria-hidden="true">
                                        <use xlinkHref="#arrow-check"></use>
                                      </svg>
                                    </span>
                                    <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                                  </label>
                                </div>
                              </div>
                            }
                          </form>
                        </div>
                      </div>
                    </section>
      </div>
      {
        user.sertificates &&
        sertificatesPopupStatus &&
          <SertificatesPopup
            sertificates={user.sertificates}
            onClosePopup={() => setSertificatesPopupStatus(false)}
          />
        }
    </div>
  )
}

const CoachInfoCard = memo(CoachInfoCardTemplate);

export default CoachInfoCard;
