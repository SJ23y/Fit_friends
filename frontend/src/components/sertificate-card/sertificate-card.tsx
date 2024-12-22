import { memo, useRef, useState } from "react"
import { Setting } from "../../consts";
import classNames from "classnames";
import { deleteSertificate, updateSertificate } from "../../store/user-process/thunk-actions";
import { useAppDispatch } from "../../hooks/use-app-dispatch";

type SertificateCardProps = {
  sertificate: string,
  isControlsVisible: boolean
}

function SertificateCardTemplate({ sertificate, isControlsVisible }: SertificateCardProps): JSX.Element {
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [sertificateUrl, setSertificateUrl] = useState<string | null>(`${Setting.BaseUrl}${sertificate}`);
  const sertificateRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const loadSertificateInputClickHandler = () => {
    const file = sertificateRef.current?.files?.[0];
    if (file) {
      setSertificateUrl(URL.createObjectURL(file));
    }
  }

  const deleteBtnClickHandler = () => {
    dispatch(deleteSertificate(sertificate));
  }

  const saveBtnClickHandler = () => {
    if (sertificateRef.current && sertificateRef.current.files?.[0]) {
      const formData = new FormData();
      formData.append('sertificate', sertificateRef.current.files[0]);
      formData.append('path', sertificate)
      dispatch(updateSertificate(formData));
    } else {
      setEditStatus(false);
    }
  }

  return(
    <div className={
      classNames({
        "certificate-card": true,
        "certificate-card--edit": editStatus
      })
    }>
      <div className="certificate-card__image">
        <object
          data={`${sertificateUrl}#toolbar=0`}
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>

      </div>
      {
        isControlsVisible &&
        <div className="certificate-card__buttons">
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
            type="button"
            onClick={() => setEditStatus(true)}
          >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Изменить</span>
          </button>
          <button
              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
              type="button"
              onClick={saveBtnClickHandler}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Сохранить</span>
            </button>

            <div className="certificate-card__controls">
              <input
                ref={sertificateRef}
                className="visually-hidden"
                type="file"
                name="updateSertificate"
                accept="application/pdf"
                onChange={loadSertificateInputClickHandler}
              />
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="next"
                onClick={() => sertificateRef?.current?.click()}
              >
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-change"></use>
                </svg>
              </button>
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="next"
                onClick={deleteBtnClickHandler}
              >
                <svg width="14" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-trash"></use>
                </svg>
              </button>
          </div>

        </div>
      }
    </div>
  )
}

const SertificateCard = memo(SertificateCardTemplate);

export default SertificateCard;
