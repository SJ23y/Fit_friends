import { memo } from "react";
import { Setting } from "../../consts";
import { Training } from "../../types/trainings";
import classNames from "classnames";

type SpecialTrainingCardProps = {
  trainingsCount: number,
  training: Training,
  trainingIndex: number,
  currentIndex: number,
  onPromoSliderBtnClick: (index: number) => void
}

function SpecialTrainingCardTemplate({
  training,
  trainingIndex,
  currentIndex,
  onPromoSliderBtnClick,
  trainingsCount
}: SpecialTrainingCardProps): JSX.Element {

  return(
    <li className={
      classNames({
        "special-offers__item": true,
        "is-active": currentIndex === trainingIndex
      })
    }>
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
          <div className="promo-slider__image">
            <img src={`${Setting.BaseUrl}/${training.image}`} height="469" alt={training.title} />
          </div>
            <div className="promo-slider__header">
              <h3 className="promo-slider__title">{training.title}</h3>
                <div className="promo-slider__logo">
                  <svg width="74" height="74" aria-hidden="true">
                    <use xlinkHref="#logotype"></use>
                  </svg>
                </div>
            </div>
              <span className="promo-slider__text">Горячие предложения на тренировки {training.title}</span>
                <div className="promo-slider__bottom-container">
                  <div className="promo-slider__slider-dots">
                    {
                      trainingsCount >= 1 &&
                      <button
                        className={
                          classNames({
                            " promo-slider__slider-dot": true,
                            "promo-slider__slider-dot--active": currentIndex === 1
                          })
                        }
                        type="button"
                        aria-label="первый слайд"
                        onClick={() => onPromoSliderBtnClick(1)}
                      >
                      </button>
                    }
                    {
                      trainingsCount >= 2 &&
                      <button
                      className={
                        classNames({
                          " promo-slider__slider-dot": true,
                          "promo-slider__slider-dot--active": currentIndex === 2
                        })
                        }
                        aria-label="второй слайд"
                        type="button"
                        onClick={() => onPromoSliderBtnClick(2)}
                      >
                      </button>
                    }
                    { trainingsCount === 3 &&
                      <button
                      className={
                        classNames({
                          " promo-slider__slider-dot": true,
                          "promo-slider__slider-dot--active": currentIndex === 3
                        })
                        }
                        aria-label="третий слайд"
                        type="button"
                        onClick={() => onPromoSliderBtnClick(3)}
                      >
                      </button>
                    }
                  </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">
                        {training.price - (training.price * Setting.SPECIAL_TRAINING_DISCONT) }
                      ₽</p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">{training.price} ₽</p>
                    </div>
        </div>
      </aside>
    </li>
  );
}

const SpecialTrainingCard = memo(SpecialTrainingCardTemplate);

export default SpecialTrainingCard;
