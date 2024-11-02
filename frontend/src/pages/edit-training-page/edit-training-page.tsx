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
import { uploadPurchaseByTrainingId } from "../../store/purchase-process/thunk-actions";
import { getTrainingPurchase } from "../../store/purchase-process/selectors";

function EditTrainingPage(): JSX.Element {
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


  useEffect(() => {
    if (trainingId && trainingId !== training?.id) {
      dispatch(uploadTrainingById(trainingId));
    }
    if (trainingId && trainingId !== purchase?.trainId) {
      dispatch(uploadPurchaseByTrainingId(trainingId));
    }
  }, [])

  return(

          <main>
        {
          training &&
            <section className="inner-page">
              <div className="container">
                <div className="inner-page__wrapper">
                  <h1 className="visually-hidden">Карточка тренировки</h1>

                  <ReviewSidebar
                    trainingId={training.id}
                    onAddReviewBtnClick={(status: boolean) => setReviewPopupStatus(status)}
                    addReviewStatus={purchase !== null && purchase.trainCount > 0}
                    addReviewDisable={true}
                  />

                  <div className="training-card training-card--edit">
                    <div className="training-info">
                      <h2 className="visually-hidden">Информация о тренировке</h2>
                      <div className="training-info__header">
                        <div className="training-info__coach">
                          <div className="training-info__photo">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet={`${Setting.StaticUrl}/img/content/avatars/coaches/photo-1.webp, ${Setting.StaticUrl}/img/content/avatars/coaches/photo-1@2x.webp 2x`} />
                              <img
                                src={`${Setting.StaticUrl}/img/content/avatars/coaches/photo-1.png`}
                                srcSet={`${Setting.StaticUrl}/img/content/avatars/coaches/photo-1@2x.png 2x`}
                                width="64" height="64"
                                alt="Изображение тренера" />
                            </picture>
                          </div>
                          <div className="training-info__coach-info">
                            <span className="training-info__label">Тренер</span>
                            <Link className="training-info__name" to={`${AppRoute.User}/sdshdhskd`}>Валерия</Link>
                          </div>
                          <button className="btn-flat btn-flat--light training-info__edit training-info__edit--edit" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Редактировать</span>
                          </button>
                          <button className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Сохранить</span>
                          </button>
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
                              <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button">
                                <svg width="14" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-discount"></use>
                                </svg><span>Сделать скидку 10%</span>
                              </button>
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
                      <div className="training-video__drop-files">
                    <form action="#" method="post">
                      <div className="training-video__form-wrapper">
                        <div className="drag-and-drop">
                          <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg></span>
                            <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
                    <div className="training-video__edit-buttons">
                      <button className="btn" type="button">Сохранить</button>
                      <button className="btn btn--outlined" type="button">Удалить</button>
                    </div>
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

export default EditTrainingPage;
