import { useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { saveQuestionnaireResult,  } from "../../store/user-process/thunk-actions";
import { ApiRoute, Setting, TRAIN_TYPES, TrainDuration, UserLevel, ValidationSetting } from "../../consts";
import { Helmet } from "react-helmet-async";
import { UserQuestionnaire } from "../../types/auth";

function QuestionnaireUser(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const typeChangeHandler = (value: string) => {
    if (selectedTypes.includes(value)) {
      setSelectedTypes(selectedTypes.filter((type) => type!== value))
    } else {
      setSelectedTypes([...selectedTypes, value])
    }
  }

  const formSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (selectedTypes.length === 0) {
      setIsError(true)
    } else {
      setIsError(false)
    }

    if (formRef.current) {
      const questionnaire = new FormData(formRef.current);
      const newQuestionnaire = {
        userLevel: questionnaire.get('userLevel') as UserLevel,
        trainDuration: questionnaire.get('trainDuration') as TrainDuration,
        caloriePerDay: parseInt(questionnaire.get('calloriesPerDay') as string, 10),
        calorieGoal: parseInt(questionnaire.get('calloriesGoal') as string, 10),
        isReadyForTrain: true,
        trainType: selectedTypes,
        } as UserQuestionnaire
      dispatch(saveQuestionnaireResult(newQuestionnaire));
    }
  }

  return(
    <div className="wrapper">
      <Helmet>
        <title>Fitfriends | Опросник</title>
      </Helmet>
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form
                  ref={formRef}
                  method="post"
                  action={`${Setting.BaseUrl}${ApiRoute.UserUpdate}`}
                  onSubmit={formSubmitHandler}
                >
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          {
                            TRAIN_TYPES.map((type, index) => (
                              <div className="btn-checkbox" key={`specialization-${type}-${index}`}>
                                <label>
                                  <input
                                    className="visually-hidden"
                                    type="checkbox"
                                    name="trainType"
                                    value={type}
                                    onChange={() => typeChangeHandler(type)}
                                    disabled={selectedTypes.length === 3 && !selectedTypes.includes(type)}
                                    checked={selectedTypes.includes(type)}
                                  />
                                  <span className="btn-checkbox__btn">{type}</span>

                                </label>
                              </div>
                            ))
                          }
                          {
                            isError && selectedTypes.length === 0
                            && <span className="custom-input__error">Не выбран тип тренировки</span>
                          }
                        </div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainDuration" value={TrainDuration.EXPRESS} required />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">10-30 мин</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainDuration" value={TrainDuration.FAST} required />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">30-50 мин</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainDuration" value={TrainDuration.MEDIUM} required />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">50-80 мин</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainDuration" value={TrainDuration.LONG} required />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">80-100 мин</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="userLevel" value={UserLevel.NEWBIE} required />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Новичок</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="userLevel" value={UserLevel.AMATEUR} required />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Любитель</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="userLevel" value={UserLevel.PRO} required />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Профессионал</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <div className="questionnaire-user__calories-lose">
                          <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="calloriesGoal"
                                  min={ValidationSetting.UserCalloriesMin}
                                  max={ValidationSetting.UserCalloriesMax}
                                  required
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="calloriesPerDay"
                                  min={ValidationSetting.UserCalloriesMin}
                                  max={ValidationSetting.UserCalloriesMax}
                                  required
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuestionnaireUser;
