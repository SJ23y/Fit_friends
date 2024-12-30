import React, { useRef, useState } from "react";
import { ApiRoute, Setting, TRAIN_TYPES, UserLevel, ValidationSetting } from "../../consts";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { saveQuestionnaireResult } from "../../store/user-process/thunk-actions";
import { Helmet } from "react-helmet-async";

function QuestionnaireCoach(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [individualTraining, setIndividualTraining] = useState(false);
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
        description: questionnaire.get('description') as string,
        trainType: selectedTypes,
        individualTraining: individualTraining
      }
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
      <svg className="background-logo__logo" width={750} height={284} aria-hidden="true">
        <use xlinkHref="#logo-big" />
      </svg>
      <svg className="background-logo__icon" width={343} height={343} aria-hidden="true">
        <use xlinkHref="#icon-logotype" />
      </svg>
    </div>
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form
              ref={formRef}
              method="post"
              action={`${Setting.BaseUrl}${ApiRoute.UserUpdate}`}
              onSubmit={formSubmitHandler}
            >
              <div className="questionnaire-coach">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-coach__wrapper">
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-coach__specializations">
                      { TRAIN_TYPES.map((type, index) => (
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
                      )) }
                      {
                            isError && selectedTypes.length === 0
                            && <span className="custom-input__error">Не выбран тип тренировки</span>
                          }
                    </div>
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input type="radio" name="userLevel" value={UserLevel.NEWBIE} required />
                          <span className="custom-toggle-radio__icon" />
                          <span className="custom-toggle-radio__label">Новичок</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input type="radio" name="userLevel" value={UserLevel.AMATEUR} required />
                          <span className="custom-toggle-radio__icon" /><span className="custom-toggle-radio__label">Любитель</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input type="radio" name="userLevel" value={UserLevel.PRO} required />
                          <span className="custom-toggle-radio__icon" />
                          <span className="custom-toggle-radio__label">Профессионал</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                    <div className="custom-textarea questionnaire-coach__textarea">
                      <label>
                        <textarea
                          name="description"
                          placeholder=" "
                          defaultValue={""}
                          minLength={ValidationSetting.CoachDescriptionMinLength}
                          maxLength={ValidationSetting.CoachDescriptionMaxLength}
                          required
                        />
                      </label>
                    </div>
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="individualTraining"
                          value={`${individualTraining}`}
                          onChange={() => setIndividualTraining(!Boolean(individualTraining)) }
                        />
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg width={9} height={6} aria-hidden="true">
                            <use xlinkHref="#arrow-check" />
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn questionnaire-coach__button"
                  type="submit"
                >Продолжить</button>
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

export default QuestionnaireCoach;
