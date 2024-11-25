import { Link, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import ReviewSidebar from "../../components/reviews-sidebar/reviews-sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getCurrentTraining } from "../../store/training-process/selectors";
import { useEffect, useRef, useState } from "react";
import { uploadTrainingById } from "../../store/training-process/thunk-actions";
import { AppRoute, Gender, Setting } from "../../consts";
import NewReviewPopup from "../../components/new-review-popup/new-review-popup";
import NewPurchasePopup from "../../components/new-purchase-popup/new-purchase-popup";
import classNames from "classnames";
import { reducePurchaseTrainings, uploadPurchaseByTrainingId } from "../../store/purchase-process/thunk-actions";
import { getTrainingPurchase } from "../../store/purchase-process/selectors";

function TrainingPage(): JSX.Element {
  const [reviewPopupStatus, setReviewPopupStatus] = useState(false);
  const [purchasePopupStatus, setPurchasePopupStatus] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const {trainingId} = useParams();
  const dispatch = useAppDispatch();
  const training = useAppSelector(getCurrentTraining);
  const purchase = useAppSelector(getTrainingPurchase);

  const keyDownClickHandler = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      setPurchasePopupStatus(false);
      setReviewPopupStatus(false);
    }
  }

  const videoClickHandler = (evt: React.MouseEvent<HTMLVideoElement>) => {
    evt.preventDefault();
    videoRef.current?.pause();
    setIsVideoPaused(true);
  }

  const videoStartBtnClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    videoRef.current?.play();
    setIsVideoPaused(false);
  }

  const startTrainingBtnClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setTrainingStatus(true);
    if (purchase && training) {
      dispatch(reducePurchaseTrainings({purchaseId: purchase.id, trainId: training.id, trainCount: 1 }))
    }
  }

  useEffect(() => {
    if (trainingId && trainingId !== training?.id) {
      dispatch(uploadTrainingById(trainingId));
      if (trainingId !== purchase?.trainId) {
        dispatch(uploadPurchaseByTrainingId(trainingId));
      }
    }
  }, [])

  return(
      <div
        className={
          classNames({
            "wrapper": true,
            "modal-open": purchasePopupStatus || reviewPopupStatus
          })
        }
        onKeyDown={keyDownClickHandler}
      >
        <Header />
        {
          training &&
          <main>
            <section className="inner-page">
              <div className="container">
                <div className="inner-page__wrapper">
                  <h1 className="visually-hidden">Карточка тренировки</h1>

                  <ReviewSidebar
                    trainingId={training.id}
                    onAddReviewBtnClick={(status: boolean) => setReviewPopupStatus(status)}
                    addReviewStatus={(purchase) ? purchase.trainCount > 0 : false}
                    addReviewDisable={(purchase) ? purchase.trainCount === purchase.remainingTrainings : false}
                  />

                  <div className="training-card">
                    <div className="training-info">
                      <h2 className="visually-hidden">Информация о тренировке</h2>
                      <div className="training-info__header">
                        <div className="training-info__coach">
                          <div className="training-info__photo">
                            <picture>
                            <img
                                src={`${Setting.BaseUrl}/${training.coach.avatar}`}
                                width="64" height="64"
                                alt="Изображение тренера" />
                            </picture>
                          </div>
                          <div className="training-info__coach-info">
                            <span className="training-info__label">Тренер</span>
                            <Link
                              className="training-info__name"
                              to={`${AppRoute.User}/${training.coach.id}`}
                            >
                              {training.coach.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="training-info__main-content">
                        <form action="#" method="get">
                          <div className="training-info__form-wrapper">
                            <div className="training-info__info-wrapper">
                              <div className="training-info__input training-info__input--training">
                                <label><span className="training-info__label">Название тренировки</span>
                                  <input type="text" name="training" value={training.title} disabled />
                                </label>
                                <div className="training-info__error">Обязательное поле</div>
                              </div>
                              <div className="training-info__textarea">
                                <label>
                                  <span className="training-info__label">Описание тренировки</span>
                                  <textarea name="description" defaultValue={training.description} disabled></textarea>
                                </label>
                              </div>
                            </div>
                            <div className="training-info__rating-wrapper">
                              <div className="training-info__input training-info__input--rating">
                                <label>
                                  <span className="training-info__label">Рейтинг</span>
                                  <span className="training-info__rating-icon">
                                    <svg width="18" height="18" aria-hidden="true">
                                      <use xlinkHref="#icon-star"></use>
                                    </svg>
                                  </span>
                                  <input type="text" name="rating" value={`${parseInt(training.rate)}`} disabled />
                                </label>
                              </div>
                              <ul className="training-info__list">
                                <li className="training-info__item">
                                  <div className="hashtag hashtag--white">
                                    <span>#{training.type}</span>
                                  </div>
                                </li>
                                <li className="training-info__item">
                                  <div className="hashtag hashtag--white">
                                    <span>#для_{
                                      (training.gender === Gender.FEMALE) ? 'женщин' :
                                      (training.gender === Gender.MALE) ? 'мужчин' : 'всех'
                                      }</span>
                                  </div>
                                </li>
                                <li className="training-info__item">
                                  <div className="hashtag hashtag--white">
                                    <span>#{training.callorieQuantity}</span>
                                  </div>
                                </li>
                                <li className="training-info__item">
                                  <div className="hashtag hashtag--white">
                                    <span>#{training.duration}</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <div className="training-info__price-wrapper">
                              <div className="training-info__input training-info__input--price">
                                <label><span className="training-info__label">Стоимость</span>
                                  <input type="text" name="price" value={`${training.price} ₽`} disabled />
                                </label>
                                <div className="training-info__error">Введите число</div>
                              </div>
                              <button
                                className="btn training-info__buy"
                                type="button"
                                disabled={(purchase) ? purchase.trainCount > 0 : false}
                                onClick={() => setPurchasePopupStatus(true)}
                              >Купить</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="training-video">
                      <h2 className="training-video__title">Видео</h2>
                      <div className="training-video__video">
                        {
                          !trainingStatus &&
                          <div className="training-video__thumbnail">
                          <picture>
                            <source type="image/webp" srcSet={`${Setting.BaseUrl}/${training.image}`} />
                            <img
                              src={`${Setting.BaseUrl}/${training.image}`}
                              width="922" height="566"
                              alt="Обложка видео"
                            />
                          </picture>
                          </div>
                        }
                        {
                          trainingStatus &&
                          <>
                            <video
                              ref={videoRef}
                              width="922" height="566"
                              src={`${Setting.BaseUrl}/${training.video}`}
                              onClick={videoClickHandler}
                            ></video>
                          </>
                        }

                           {
                            isVideoPaused &&
                            <button
                                className={
                                  classNames({
                                    "training-video__play-button btn-reset": true,
                                    "is-disabled": !trainingStatus
                                  })
                                }
                                disabled={!trainingStatus}
                                onClick={videoStartBtnClickHandler}
                              >
                                <svg width="18" height="30" aria-hidden="true">
                                  <use xlinkHref="#icon-arrow"></use>
                                </svg>
                              </button>
                            }
                      </div>
                      {
                        purchase &&
                        <div className={classNames({
                          "training-video__buttons-wrapper": true,
                          "training-video--stop": trainingStatus
                        })}>
                          <button
                            className="btn training-video__button training-video__button--start"
                            type="button"
                            disabled={(purchase === null || purchase.trainCount === 0)}
                            onClick={startTrainingBtnClickHandler}
                          >
                              Приступить
                          </button>
                          <button
                            className="btn training-video__button training-video__button--stop"
                            type="button"
                            onClick={() => setTrainingStatus(false)}
                          >
                            Закончить
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>

        </main>
        }
        {
          training &&
          reviewPopupStatus &&
          <NewReviewPopup
            trainingId={training.id}
            onClosePopup={() => setReviewPopupStatus(false)}
          />
        }
        {
          training &&
          purchasePopupStatus &&
          <NewPurchasePopup
            training={training}
            onClosePopup={() => setPurchasePopupStatus(false)}
         />
        }

      </div>
  )
}

export default TrainingPage;
