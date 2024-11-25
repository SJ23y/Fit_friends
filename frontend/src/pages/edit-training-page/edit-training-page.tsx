import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import ReviewSidebar from "../../components/reviews-sidebar/reviews-sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getCurrentTraining } from "../../store/training-process/selectors";
import React, { useEffect, useRef, useState } from "react";
import { updateTraining, uploadTrainingById } from "../../store/training-process/thunk-actions";
import { AppRoute, Gender, Setting, ValidationSetting } from "../../consts";
import classNames from "classnames";
import { getUserInfo } from "../../store/user-process/selectors";
import { UpdateTraining } from "../../types/trainings";

function EditTrainingPage(): JSX.Element {
  const training = useAppSelector(getCurrentTraining);
  const user = useAppSelector(getUserInfo);
  const {trainingId} = useParams();

  const [editStatus, setEditStatus] = useState(false);
  const [formData, setFormData] = useState<UpdateTraining>({
    title: training?.title,
    description: training?.description,
    video: `${Setting.BaseUrl}/${training?.video}`,
    isSpecialOffer: training?.isSpecialOffer,
    price: training?.price
  });
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    video: false
  })
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formDataChangeHandler = (evt: React.FormEvent)  => {
    evt.preventDefault();
    const {name, value} = evt.target as HTMLInputElement;
    if (name === 'price') {
      const newPrice = parseInt(value.split(' ')[0], 10);
      setFormData({...formData, price: (isNaN(newPrice)) ? 0: newPrice});
    } else {
      setFormData({...formData, [name]: value});
    }
  }

  const specialOfferButtonClickHandler = () => {
    if (formData.isSpecialOffer && formData.price) {
      setFormData({...formData, price: formData.price/0.9, isSpecialOffer: false})
    }
    if (!formData.isSpecialOffer && formData.price) {
      setFormData({...formData, price: formData.price*0.9, isSpecialOffer: true })
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

  const saveVideoBtnCLickHandler = () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (file) {
        setFormData({...formData, video: URL.createObjectURL(file)})
      }
    }
  }

  const formSubmitHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setFormErrors({
      title: (!formData.title) ? true : !(formData.title?.length >= 1 && formData.title?.length <= ValidationSetting.TrainingTitleMaxLength),
      description: (!formData.description) ? true : !(formData.description?.length <= ValidationSetting.TrainingDescriptionMaxLength && formData.description?.length >= ValidationSetting.TrainingDescriptionMinLength),
      video: !formData.video
    });
    if (formRef.current && !Object.values(formErrors).some(value => value)) {
      const data = new FormData(formRef.current);
      formData.price && data.append('price', formData.price.toString());
      const file = fileInputRef.current?.files?.[0];
      file && data.append('video', file);
      dispatch(updateTraining({
        trainingId: training?.id ?? '',
        newTraining: data
      })).then(() => {
        setEditStatus(false);
      })
    }
  }

  useEffect(() => {
    if (training && training.coachId !== user?.id) {
      navigate(AppRoute.Account);
    }
    else if (trainingId && trainingId !== training?.id) {
      dispatch(uploadTrainingById(trainingId));
    }
  }, []);



  return(
      <>
        <Header />
        {
          training &&
          training.coach &&
          <main>
            <section className="inner-page">
              <div className="container">
                <div className="inner-page__wrapper">
                  <h1 className="visually-hidden">Карточка тренировки</h1>

                  <ReviewSidebar
                    trainingId={training.id}
                    addReviewStatus={false}
                    addReviewDisable={true}
                  />

                  <div className={
                    classNames({
                      "training-card": true,
                      "training-card--edit": editStatus
                    })
                  }
                  >
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
                        <button
                          className="btn-flat btn-flat--light training-info__edi training-info__edit--edit"
                          type="button"
                          onClick={() => setEditStatus(true)}
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg>
                          <span>Редактировать</span>
                        </button>
                        <button
                          className="btn-flat btn-flat--light btn-flat--underlined training-info__edi training-info__edit--save"
                          type="button"
                          disabled={!formData.video}
                          onClick={formSubmitHandler}
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg>
                          <span>Сохранить</span>
                        </button>
                      </div>
                      <div className="training-info__main-content">
                        <form
                          ref={formRef}
                          action={`${Setting.BaseUrl}/update`}
                          method="post"
                        >
                          <div className="training-info__form-wrapper">
                            <div className="training-info__info-wrapper">
                              <div className={
                                      classNames({
                                        "training-info__input training-info__input--training": true,
                                        "is-invalid": formErrors.title
                                      })
                                    }>
                                <label>
                                  <span className="training-info__label">Название тренировки</span>
                                  <input
                                    type="text"
                                    name="title"
                                    maxLength={ValidationSetting.TrainingTitleMaxLength}
                                    value={formData.title}
                                    disabled={!editStatus}
                                    onChange={formDataChangeHandler}
                                  />
                                </label>
                                <div className="training-info__error">
                                    {`Название тренировки должно быть 1-${ValidationSetting.TrainingTitleMaxLength} символов`}
                                </div>

                              </div>
                              <div className={
                                      classNames({
                                        "training-info__textarea": true,
                                        "training-info__input is-invalid": formErrors.description
                                      })
                                    }>
                                <label>
                                  <span className="training-info__label">Описание тренировки</span>
                                  <textarea
                                    name="description"
                                    maxLength={ValidationSetting.TrainingDescriptionMaxLength}
                                    defaultValue={formData.description}
                                    disabled={!editStatus}
                                    onChange={formDataChangeHandler}
                                  >
                                  </textarea>
                                </label>
                                {
                                  <div className="training-info__error">
                                    {`Описание тренировки должно быть ${ValidationSetting.TrainingDescriptionMinLength}-${ValidationSetting.TrainingDescriptionMaxLength} символов`}
                                  </div>
                                }
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
                                  <input
                                    type="text"
                                    name="rating"
                                    value={`${parseInt(training.rate)}`}
                                    disabled
                                  />
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
                              <div className={
                                      classNames({
                                        "training-info__input training-info__input--price": true
                                      })
                                    }>
                                <label>
                                  <span className="training-info__label">Стоимость</span>
                                  <input
                                    type="text"
                                    name="price"
                                    value={`${formData.price} ₽`}
                                    disabled={!editStatus}
                                    onChange={formDataChangeHandler}
                                  />
                                </label>
                              </div>
                                <button
                                  className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                                  type="button"
                                  onClick={specialOfferButtonClickHandler}
                                >
                                  <svg width="14" height="14" aria-hidden="true">
                                    <use xlinkHref="#icon-discount"></use>
                                  </svg>
                                  <span>
                                    {
                                      (formData.isSpecialOffer) ? 'Отменить скидку': 'Сделать скидку 10%'
                                    }
                                  </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className={
                      classNames({
                        "training-video": true,
                        "training-video--load": !formData.video
                      })
                    }>

                          <h2 className="training-video__title">Видео</h2>
                          <div className="training-video__video">
                                <video
                                  ref={videoRef}
                                  width="922" height="566"
                                  src={formData.video}
                                  onClick={videoClickHandler}
                                ></video>


                              {
                                isVideoPaused &&
                                <button
                                    className={
                                      classNames({
                                        "training-video__play-button btn-reset": true
                                      })
                                    }
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
                                <label>
                                  <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                                    <svg width="20" height="20" aria-hidden="true">
                                      <use xlinkHref="#icon-import-video"></use>
                                    </svg></span>
                                  <input
                                    type="file"
                                    name="import"
                                    tabIndex={-1}
                                    accept=".mov, .avi, .mp4"
                                    ref={fileInputRef}
                                  />
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className={classNames({
                          "training-video__buttons-wrapper": true
                        })}>

                            <div className="training-video__edit-buttons">
                              <button
                                className="btn"
                                type="button"
                                onClick={saveVideoBtnCLickHandler}
                              >Сохранить</button>
                              <button
                                className="btn btn--outlined"
                                type="button"
                                onClick={() => setFormData({...formData, video: ''})}
                              >Удалить
                              </button>
                            </div>
                        </div>
                      </div>



                  </div>
                </div>
              </div>
            </section>
        </main>
        }
      </>
)
}


export default EditTrainingPage;
