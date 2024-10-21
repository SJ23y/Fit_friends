import React, { useState } from "react";
import { PaymentType, Setting, ValidationSetting } from "../../consts";
import { Training } from "../../types/trainings";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { addNewPurchase } from "../../store/purchase-process/thunk-actions";

type NewPurchasePopupProps = {
  training: Training;
  onClosePopup: () => void;
}

function NewPurchasePopup({training, onClosePopup}: NewPurchasePopupProps): JSX.Element {
  const [trainingQuantity, setTrainingQuantity] = useState<number>(ValidationSetting.PurchaseMinCount);
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
  const dispatch = useAppDispatch();

  const changeQuantityHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    const element = evt.target as HTMLInputElement;
    setTrainingQuantity(parseInt(element.value));
  }

  const buyBtnClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (paymentType !== null) {
      dispatch(addNewPurchase({
        newPurchase: {
          paymentType,
          price: training.price,
          trainCount: trainingQuantity,
          trainId: training.id,
          type: Setting.DefaultPurchaseType
        },
        cb: onClosePopup
      }))
    }
  }

  return(
      <div className="popup-form popup-form--buy">
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Купить тренировку</h2>
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
            <div className="popup__content popup__content--purchases">
              <div className="popup__product">
                <div className="popup__product-image">
                  <picture>
                    <source type="image/webp" srcSet={`${Setting.BaseUrl}/${training.image}`} />
                    <img src={`${Setting.BaseUrl}/${training.image}`} srcSet="img/content/popup/popup-energy@2x.jpg 2x" width="98" height="80" alt="" />
                  </picture>
                </div>
                <div className="popup__product-info">
                  <h3 className="popup__product-title">{training.title}</h3>
                  <p className="popup__product-price">{training.price} ₽</p>
                </div>
                <div className="popup__product-quantity">
                  <p className="popup__quantity">Количество</p>
                  <div className="input-quantity">
                    <button
                      className="btn-icon btn-icon--quantity"
                      type="button"
                      aria-label="minus"
                      disabled={trainingQuantity === ValidationSetting.PurchaseMinCount}
                      onClick={() => setTrainingQuantity(trainingQuantity - 1)}
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-minus"></use>
                      </svg>
                    </button>
                    <div className="input-quantity__input">
                      <label>
                        <input
                          type="number"
                          value={trainingQuantity}
                          onChange={changeQuantityHandler}
                        />
                      </label>
                    </div>
                    <button
                      className="btn-icon btn-icon--quantity"
                      type="button"
                      disabled={trainingQuantity === ValidationSetting.PurchaseMaxCount}
                      onClick={() => setTrainingQuantity(trainingQuantity + 1)}
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-plus"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <section className="payment-method">
                <h4 className="payment-method__title">Выберите способ оплаты</h4>
                <ul className="payment-method__list">
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          name="payment-purchases"
                          aria-label={PaymentType.VISA}
                          checked={paymentType === PaymentType.VISA}
                          onChange={() => setPaymentType(PaymentType.VISA)}
                        />
                        <span className="btn-radio-image__image">
                          <svg width="58" height="20" aria-hidden="true">
                            <use xlinkHref="#visa-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          name="payment-purchases"
                          aria-label={PaymentType.MIR}
                          checked={paymentType === PaymentType.MIR}
                          onChange={() => setPaymentType(PaymentType.MIR)}
                        />
                        <span className="btn-radio-image__image">
                          <svg width="66" height="20" aria-hidden="true">
                            <use xlinkHref="#mir-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          name="payment-purchases"
                          aria-label={PaymentType.UMONEY}
                          checked={paymentType === PaymentType.UMONEY}
                          onChange={() => setPaymentType(PaymentType.UMONEY)}
                        />
                        <span className="btn-radio-image__image">
                          <svg width="106" height="24" aria-hidden="true">
                            <use xlinkHref="#iomoney-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                </ul>
              </section>
              <div className="popup__total">
                <p className="popup__total-text">Итого</p>
                <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                  <use xlinkHref="#dash-line"></use>
                </svg>
                <p className="popup__total-price">{training.price * trainingQuantity}&nbsp;₽</p>
              </div>
              <div className="popup__button">
                <button
                  className="btn"
                  type="button"
                  disabled={paymentType === null}
                  onClick={buyBtnClickHandler}
                  >Купить</button>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}

export default NewPurchasePopup;
