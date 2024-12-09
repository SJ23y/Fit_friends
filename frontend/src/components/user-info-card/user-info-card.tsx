import { Link } from "react-router-dom";
import { Setting } from "../../consts";
import { UserData } from "../../types/auth";
import { isUserQuestionnaire } from "../../utils";
import { memo } from "react";

type UserInfoCardProps = {
  user: UserData,
  onAddFriend: () => void,
  onDeleteFriend: () => void,
  isFriend: boolean
}

function UserInfoCardTemplate({user, onAddFriend, onDeleteFriend, isFriend}: UserInfoCardProps): JSX.Element {
  return(
    <div className="inner-page__content">
                  <section className="user-card">
                    <h1 className="visually-hidden">Карточка пользователя</h1>
                    <div className="user-card__wrapper">
                      <div className="user-card__content">
                        <div className="user-card__head">
                          <h2 className="user-card__title">{user.name}</h2>
                        </div>
                        <div className="user-card__label">
                          <Link to="#">
                            <svg className="user-card-coach__icon-location" width={12} height={14} aria-hidden="true">
                              <use xlinkHref="#icon-location" />
                            </svg>
                            <span>{user.location}</span>
                          </Link>
                        </div>
                        {
                          isUserQuestionnaire(user.questionnaire) &&
                          user.questionnaire.isReadyForTrain &&
                          <div className="user-card__status">
                            <span>Готов к тренировке</span>
                          </div>
                        }
                        {
                              isUserQuestionnaire(user.questionnaire) &&
                              !user.questionnaire.isReadyForTrain &&
                              <div className="user-card-coach-2__status user-card-coach-2__status--check">
                                <span>Не готов к тренировке</span>
                              </div>
                            }
                        <div className="user-card__text">
                          <p>{user.description}</p>
                        </div>
                        <ul className="user-card__hashtag-list">
                          {
                            user.questionnaire.trainType.map((type, index) => (
                              <li className="user-card__hashtag-item"  key={`hashtag-type-${index}`}>
                                <div className="hashtag"><span>#{type}</span></div>
                              </li>
                            ))
                          }
                        </ul>
                        {
                          !isFriend &&
                          <button
                            className="btn user-card__btn"
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
                      <div className="user-card__gallary">
                        <ul className="user-card__gallary-list">
                          <li className="user-card__gallary-item">
                            <img src={`${Setting.BaseUrl}/${user.avatar}`} width="334" height="573" alt="photo1" />
                          </li>
                          <li className="user-card__gallary-item">
                            <img src={`${Setting.BaseUrl}/${user.backgroundImage}`} width="334" height="573" alt="photo2" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
              </div>
  )
}

const UserInfoCard = memo(UserInfoCardTemplate);

export default UserInfoCard;
