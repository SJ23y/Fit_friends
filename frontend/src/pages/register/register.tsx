import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { checkAuthentication, getUserError } from "../../store/user-process/selectors";
import { ApiRoute, AppRoute, Gender, LOCATIONS, Role, Setting, ValidationSetting } from "../../consts";
import { registerUser } from "../../store/user-process/thunk-actions";
function Register(): JSX.Element {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLUListElement | null>(null);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuthentication);
  const validationError = useAppSelector(getUserError);

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoute.Main);
    }
}, [isAuth]);

const loadAvatarInputClickHandler = (evt: React.FormEvent<HTMLInputElement>) => {
  evt.preventDefault();
  const file = avatarRef.current?.files?.[0];
  if (file) {
    setAvatar(URL.createObjectURL(file));
  }
}

const customSelectBtnClickHandler = () => {
  if (locationRef.current) {
    locationRef.current.style.visibility = 'visible';
    locationRef.current.style.opacity = '1';
  }
}

const selectLocationClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
  const locationElement = evt.target as HTMLElement;
  setLocation(locationElement.innerText);
  if (locationRef.current) {
    locationRef.current.style.visibility = 'hidden';
    locationRef.current.style.opacity = '0';
  }

}

const formSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      formData.set('location', location ?? '');
      formData.delete('user-agreement');
      console.log(Object.fromEntries(formData));
      dispatch(registerUser(formData));
    }
  }

  return(
    <div className="wrapper">
      {
        !isAuth &&
        <main>
          <div className="background-logo">
            <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
              <use xlinkHref="#logo-big"></use>
            </svg>
            <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
              <use xlinkHref="#icon-logotype"></use>
            </svg>
          </div>
          <div className="popup-form popup-form--sign-up">
            <div className="popup-form__wrapper">
              <div className="popup-form__content">
                <div className="popup-form__title-wrapper">
                  <h1 className="popup-form__title">Регистрация</h1>
                </div>
                <div className="popup-form__form">
                  <form ref={formRef} method="post" action={`${Setting.BaseUrl}/${ApiRoute.Register}`} onSubmit={formSubmitHandler}>
                    <div className="sign-up">
                      <div className="sign-up__load-photo">
                        <div className="input-load-avatar">
                          <label>
                            <input
                              ref={avatarRef}
                              name="avatar"
                              className="visually-hidden"
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={loadAvatarInputClickHandler} />
                            <span className="input-load-avatar__btn">
                              {
                                !avatar &&
                                <svg width="20" height="20" aria-hidden="true">
                                  <use xlinkHref="#icon-import"></use>
                                </svg>
                              }
                              {
                                avatar &&
                                <img src={avatar} alt="avatar-image" />
                              }
                            </span>
                          </label>
                        </div>
                        <div className="sign-up__description">
                          <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                          <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                        </div>
                      </div>
                      <div className="sign-up__data">
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                              <input
                                type="text"
                                name="name"
                                minLength={ValidationSetting.userNameMinLength}
                                maxLength={ValidationSetting.userNameMaxLength}
                                required
                                />
                              </span>
                          </label>
                        </div>
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                              <input type="email" name="email" required /></span>
                          </label>
                        </div>
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Дата рождения</span><span className="custom-input__wrapper">
                              <input type="date" name="birthDate" max="2099-12-31" /></span>
                          </label>
                        </div>
                        <div className="custom-select custom-select--not-selected">
                          <span className="custom-select__label">Ваша локация</span>
                          {location && <div className="custom-select__placeholder">{`ст. м. ${location}`}</div>}
                          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={customSelectBtnClickHandler}>
                            <span className="custom-select__text">{location}</span>
                            <span className="custom-select__icon">
                              <svg width="15" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-down"></use>
                              </svg>
                            </span>
                          </button>
                          <ul
                            ref={locationRef}
                            className="custom-select__list"
                            role="listbox"
                            onClick={selectLocationClickHandler}
                            >
                              {
                                LOCATIONS.map((location, index) => (
                                <li role="option" key={`${location}-${index}`}>{location}</li>
                                ))
                              }
                          </ul>
                        </div>
                        <div className="custom-input">
                          <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                              <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                minLength={ValidationSetting.passwordMinLength}
                                maxLength={ValidationSetting.passwordMaxLength}
                                required
                                 /></span>
                          </label>
                        </div>
                        <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                          <div className="custom-toggle-radio custom-toggle-radio--big">
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input type="radio" name="gender" value={Gender.MALE} required />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label" >{Gender.MALE}</span>
                              </label>
                            </div>
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input type="radio" name="gender" value="{Gender.FEMALE}" required />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{Gender.FEMALE}</span>
                              </label>
                            </div>
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input type="radio" name="gender" value={Gender.NONE} required />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{Gender.NONE}</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sign-up__role">
                        <h2 className="sign-up__legend">Выберите роль</h2>
                        <div className="role-selector sign-up__role-selector">
                          <div className="role-btn">
                            <label>
                              <input className="visually-hidden" type="radio" name="role" value={Role.COACH} required />
                              <span className="role-btn__icon" >
                                <svg width="12" height="13" aria-hidden="true">
                                  <use xlinkHref="#icon-cup"></use>
                                </svg>
                              </span>
                              <span className="role-btn__btn">Я хочу тренировать</span>
                            </label>
                          </div>
                          <div className="role-btn">
                            <label>
                              <input className="visually-hidden" type="radio" name="role" value={Role.USER} required />
                              <span className="role-btn__icon">
                                <svg width="12" height="13" aria-hidden="true">
                                  <use xlinkHref="#icon-weight"></use>
                                </svg>
                              </span>
                              <span className="role-btn__btn">Я хочу тренироваться</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="sign-up__checkbox">
                        <label>
                          <input type="checkbox" value="user-agreement" name="user-agreement" required />
                          <span className="sign-up__checkbox-icon" >
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                        </label>
                      </div>
                      <button className="btn sign-up__button" type="submit">Продолжить</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    </div>
  )
}

export default Register;
