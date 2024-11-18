import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { checkAuthentication } from "../../store/user-process/selectors";
import { ApiRoute, AppRoute, Gender, LOCATIONS, Role, Setting, ValidationSetting } from "../../consts";
import { registerUser } from "../../store/user-process/thunk-actions";
import CustomSelect from "../../components/custom-select/custom-select";
import { Helmet } from "react-helmet-async";
function Register(): JSX.Element {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuthentication);

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoute.Main);
    }
}, []);

const loadAvatarInputClickHandler = (evt: React.FormEvent<HTMLInputElement>) => {
  evt.preventDefault();
  const file = avatarRef.current?.files?.[0];
  if (file) {
    setAvatar(URL.createObjectURL(file));
  }
}

const formSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      formData.set('location', location ?? '');
      formData.delete('user-agreement');
      dispatch(registerUser(formData));
    }
  }

  return(
    <div className="wrapper">
      <Helmet>
        <title>Fitfriends | Регистрация</title>
      </Helmet>
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
                        <CustomSelect
                          title="Ваша локация"
                          items={LOCATIONS}
                          cb={(value) => setLocation(value)}
                          disableStatus={false}
                          defaultValue={location ? location : ''}
                          additionalClassName=""
                        />
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Пароль</span>
                            <span className="custom-input__wrapper">
                              <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                minLength={ValidationSetting.passwordMinLength}
                                maxLength={ValidationSetting.passwordMaxLength}
                                required
                                 />
                            </span>
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
                                <input type="radio" name="gender" value={Gender.FEMALE} required />
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
