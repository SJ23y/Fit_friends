import React, { useRef, useState } from "react";
import { Setting, ValidationSetting } from "../../consts";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { addNewReview } from "../../store/review-process/thunk-actions";

type NewReviewPopupProps = {
  trainingId: string;
  onClosePopup: () => void;
}

function NewReviewPopup({trainingId, onClosePopup}: NewReviewPopupProps): JSX.Element {
  //const [content, setContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [rate, setRate] = useState(0);
  const [rateIsNotValid, setRateIsNotValid] = useState(false);
  const dispatch = useAppDispatch();


  const saveReviewBtnClickHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (rate === 0) {
      setRateIsNotValid(true);
    } else {
      setRateIsNotValid(false);
    }
    contentRef.current?.reportValidity();
    if (contentRef.current && contentRef.current.checkValidity() && rate > 0) {
      dispatch(
        addNewReview({
          newReview: {rate, content: contentRef.current.value, trainId: trainingId},
          cb: onClosePopup
        })
      );
    }

  }

  return(
    <section className="popup popup-form--feedback">
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button
            className="btn-icon btn-icon--outlined btn-icon--big"
            type="button"
            aria-label="close"
            onClick={() => onClosePopup()}
          >
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            {
              Array
                .from({length: Setting.MaxRating }, (_v,i) => i+1)
                .map((index) => (
                  <li className="popup__rate-item" key={`popup-rate-${index}`}>
                    <div className="popup__rate-item-wrap">
                      <label>
                        <input type="radio"
                          name="оценка тренировки"
                          aria-label={`оценка ${index}.`}
                          value={index}
                          checked={index === rate}
                          onChange={() => setRate(index)}
                          required
                        />
                        <span className="popup__rate-number">{index}</span>
                      </label>
                    </div>
                  </li>
                ))
            }
          </ul>
          {rateIsNotValid && <span className="custom-input__error">Требуется поставить оценку</span>}
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">
              Поделитесь своими впечатлениями о тренировке
            </h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <textarea
                    ref={contentRef}
                    name="description"
                    placeholder=" "
                    maxLength={ValidationSetting.ReviewContentMaxLength}
                    minLength={ValidationSetting.ReviewContentMinLength}
                    required
                  ></textarea>
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button
            className="btn"
            type="button"
            onClick={saveReviewBtnClickHandler}
          >Продолжить</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewReviewPopup;
