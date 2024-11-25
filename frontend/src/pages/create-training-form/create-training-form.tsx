import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getUserInfo } from "../../store/user-process/selectors";
import { ApiRoute, AppRoute, Gender, Role, Setting, TRAIN_TYPES, TrainDuration, UserLevel, ValidationSetting } from "../../consts";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select";
import { addNewTraining } from "../../store/training-process/thunk-actions";

function CreateTrainingForm():JSX.Element {
  const user = useAppSelector(getUserInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorStatus, setErrorStatus] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [trainDuration, setTrainDuration] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(()=> {
    if (user?.role === Role.USER) {
      navigate(AppRoute.Main);
    }
  }, [])

  const formSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!type || !level || !trainDuration) {
      setErrorStatus(true);
    } else {
      setErrorStatus(false);
      if (formRef.current) {
        const data = new FormData(formRef.current);
        data.append('type', type);
        data.append('duration', trainDuration);
        data.append('level', level);
        data.append('isSpecialOffer', 'false')
        dispatch(addNewTraining(data))
      }
    }
  }

  return(
    <main>
      {
        user?.role === Role.COACH &&
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form
                  ref={formRef}
                  method="post"
                  action={`${Setting.BaseUrl}/${ApiRoute.Trainings}`}
                  onSubmit={formSubmitHandler}
                >
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="text"
                                name="title"
                                maxLength={ValidationSetting.TrainingTitleMaxLength}
                                required
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className="create-training__info">
                          <div className="custom-select custom-select--not-selected">
                            <CustomSelect
                              title="Выберите тип тренировки"
                              items={TRAIN_TYPES}
                              disableStatus={false}
                              cb={(value) => setType(value)}
                              defaultValue={type ?? ''}
                              additionalClassName=""
                            />
                            {
                              errorStatus && !type &&
                              <span className="custom-input__error">Не выбран тип тренировки</span>
                            }
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Сколько калорий потратим</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="callorieQuantity"
                                  min={ValidationSetting.UserCalloriesMin}
                                  max={ValidationSetting.UserCalloriesMax}
                                  required
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <CustomSelect
                              title="Сколько времени потратим"
                              items={Object.values(TrainDuration)}
                              disableStatus={false}
                              cb={(value) => setTrainDuration(value)}
                              defaultValue={trainDuration ?? ''}
                              additionalClassName=""
                            />
                            {
                              errorStatus && !trainDuration &&
                              <span className="custom-input__error">Не выбрана продолжительность тренировки</span>
                            }
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="price"
                                  required
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <CustomSelect
                              title="Выберите уровень тренировки"
                              items={Object.values(UserLevel)}
                              disableStatus={false}
                              cb={(value) => setLevel(value)}
                              defaultValue={level ?? ''}
                              additionalClassName=""
                            />
                            {
                              errorStatus && !level &&
                              <span className="custom-input__error">Не выбран уровень тренировки</span>
                            }
                          </div>
                          <div className="create-training__radio-wrapper">
                            <span className="create-training__label">Кому подойдет тренировка</span>
                            <br />
                            <div className="custom-toggle-radio create-training__radio">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender" value={Gender.MALE} required  />
                                  <span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Мужчинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender" value={Gender.FEMALE} required />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">Женщинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender" value={Gender.NONE} required />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">Всем</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea
                              name="description"
                              placeholder=" "
                              minLength={ValidationSetting.TrainingDescriptionMinLength}
                              maxLength={ValidationSetting.TrainingDescriptionMaxLength}
                              required
                            ></textarea>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input type="file" name="video" tabIndex={-1} accept=".mov, .avi, .mp4" required />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="btn create-training__button" type="submit">Опубликовать</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    }
  </main>
  );
}

export default CreateTrainingForm;
