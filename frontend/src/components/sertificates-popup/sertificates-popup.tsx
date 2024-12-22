import { useState } from "react";
import CoachSertificatesSection from "../coach-sertificates-section/coach-sertificate-section";
import SertificateCard from "../sertificate-card/sertificate-card";

type SertificatesPopupProps = {
  sertificates: string[];
  onClosePopup: () => void;
}

function SertificatesPopup({sertificates, onClosePopup}: SertificatesPopupProps): JSX.Element {
  const [sliderPosition, setSilderPosition] = useState<number>(0);

  return(
    <section className="popup popup-form--membership">
      <div className="popup__wrapper">
        <div className="popup-head">
                  <h2 className="popup-head__header">Сертификаты тренера</h2>
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
        <div className="popup__content popup__content--certificates">
          <div className="popup__slider-buttons">
            <button
              className="btn-icon popup__slider-btn popup__slider-btn--prev"
              type="button"
              aria-label="prev"
              disabled={sliderPosition === 0}
              onClick={() => setSilderPosition(sliderPosition - 1)}
            >
              <svg width={16} height={14} aria-hidden="true">
                <use xlinkHref="#arrow-left" />
              </svg>
            </button>
            <button
              className="btn-icon popup__slider-btn popup__slider-btn--next"
              type="button"
              aria-label="next"
              disabled={sliderPosition === sertificates.length - 1}
              onClick={() => setSilderPosition(sliderPosition + 1)}
            >
              <svg width={16} height={14} aria-hidden="true">
                <use xlinkHref="#arrow-right" />
              </svg>
            </button>
          </div>
          <ul className="popup__slider-list">
            {
              sertificates
                .map((sertificate, index) => {
                  if (index === sliderPosition) {
                    return(
                    <li
                      className="personal-account-coach__item"
                      key={`sertificate-${sertificate}`}
                    >
                      <SertificateCard sertificate={sertificate} isControlsVisible={false} />
                    </li>
                    )
                  }
                })
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SertificatesPopup;
