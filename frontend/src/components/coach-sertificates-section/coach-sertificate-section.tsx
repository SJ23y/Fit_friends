import { memo, useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { addNewSertificate } from "../../store/user-process/thunk-actions";
import SertificateCard from "../sertificate-card/sertificate-card";
import { Setting } from "../../consts";

type CoachSertificatesSectionProps = {
  sertificates?: string[]
}

function CoachSertificatesSectionTemplate({ sertificates }: CoachSertificatesSectionProps ): JSX.Element {
  const sertificateRef = useRef<HTMLInputElement | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const dispatch = useAppDispatch();

  const loadSertificateInputClickHandler = () => {
    if (sertificateRef.current && sertificateRef.current.files?.[0]) {
      const formData = new FormData();
      formData.append('sertificate', sertificateRef.current.files[0]);
      dispatch(addNewSertificate(formData));
    }
  }

  return(
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <input
          ref={sertificateRef}
          className="visually-hidden"
          type="file"
          name="newSertificate"
          accept="application/pdf"
          onChange={loadSertificateInputClickHandler}
        />
        <button
          className="btn-flat btn-flat--underlined personal-account-coach__button"
          type="button"
          onClick={() => sertificateRef.current?.click()}
        >
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg>
          <span>Загрузить</span>
        </button>
        {
          sertificates &&
          sertificates.length > 3 &&
          <div className="personal-account-coach__controls">
            <button
              className="btn-icon personal-account-coach__control"
              type="button"
              aria-label="previous"
              disabled={startIndex === Setting.SertificateSliderStep - 1}
              onClick={() => setStartIndex(startIndex - Setting.SertificateSliderStep)}
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button
              className="btn-icon personal-account-coach__control"
              type="button"
              aria-label="next"
              disabled={
                startIndex === (sertificates.length - Setting.SertificateCardPerStep)
              }
              onClick={() => setStartIndex(startIndex + Setting.SertificateSliderStep)}
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        }
      </div>
        <ul className="personal-account-coach__list" data-testid="sertificateCardElement">
          {
            sertificates?.length === 0 &&
            <div className="personal-account-coach__calendar">
              <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                    <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                  </picture>
                </div>
                <div className="thumbnail-spec-gym__header">
                  <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                </div>
              </div>
            </div>
          }
          {
            sertificates &&
            sertificates.length > 0 &&
            sertificates
              .slice(startIndex, startIndex + Setting.SertificateCardPerStep)
              .map((sertificate) => (
                <li className="personal-account-coach__item" key={`sertificate-${sertificate}`} data-testId={`${sertificate}`}>
                  <SertificateCard sertificate={sertificate} isControlsVisible={true} />
                </li>
              ))
          }
        </ul>
     </div>
  )
}

const CoachSertificatesSection = memo(CoachSertificatesSectionTemplate)

export default CoachSertificatesSection;
