import classNames from "classnames";
import { memo, useState } from "react";

type CustomSelectProps = {
  title: string;
  items: string[];
  disableStatus: boolean;
  defaultValue: string;
  cb: (value: string) => void;
  additionalClassName: string
}

function CustomSelectTemplate({title, items, disableStatus, defaultValue, additionalClassName, cb}: CustomSelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const selectItemClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    const element = evt.target as HTMLElement;
    cb(element.innerText);
    setIsOpen(false);
  }

  return(
    <div className={
      classNames({
        "custom-select--not-selected": defaultValue === '',
        "custom-select--readonly is-disabled": disableStatus,
        [`custom-select ${additionalClassName}`]: true,
        "is-open": isOpen
      })
    }>
      <span className="custom-select__label">{title}</span>
      <div className="custom-select__placeholder">{defaultValue}</div>
            <button
              className="custom-select__button"
              type="button"
              aria-label="Выберите одну из опций"
              disabled={disableStatus}
              onClick={() => setIsOpen(true)}
            >
              <span className="custom-select__text"></span>
              <span className="custom-select__icon">
                <svg width="15" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </span>
            </button>
            <ul
              className="custom-select__list"
              role="listbox"
              onClick={selectItemClickHandler}
              >
                {
                  items.map((item, index) => (
                  <li role="option" key={`${title}-${item}-${index}`} value={item}>{item}</li>
                  ))
                }
            </ul>
    </div>
  );
}


const CustomSelect = memo(CustomSelectTemplate);

export default CustomSelect;
