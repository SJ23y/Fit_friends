import { useNavigate } from "react-router-dom";
import { ApiRoute, AppRoute, Setting, ValidationSetting } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { checkAuthentication, getUserError } from "../../store/user-process/selectors";
import React, { useEffect, useRef } from "react";
import { loginUser } from "../../store/user-process/thunk-actions";
import { Helmet } from "react-helmet-async";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuthentication);
  const validationError = useAppSelector(getUserError);

  useEffect(() => {
      if (isAuth) {
        navigate(AppRoute.Main)
      }
  }, [isAuth]);

  const formSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current) {
      dispatch(
        loginUser({
          password: passwordRef.current.value,
          email: emailRef.current.value
        }));

    }
  }

  return(
    <div className="wrapper">
      <Helmet>
        <title>Fitfriends | Вход</title>
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
          <div className="popup-form popup-form--sign-in">
            <div className="popup-form__wrapper">
              <div className="popup-form__content">
                <div className="popup-form__title-wrapper">
                  <h1 className="popup-form__title">Вход</h1>
                </div>
                <div className="popup-form__form">
                  <form method="post" action={`${Setting.BaseUrl}/${ApiRoute.Login}`} onSubmit={formSubmitHandler}>
                    <div className="sign-in">
                      <div className="custom-input sign-in__input">
                        <label>
                          <span className="custom-input__label">E-mail</span>
                          <span className="custom-input__wrapper">
                            <input ref={emailRef} type="email" name="email" />
                          </span>
                          {
                            (validationError?.message?.startsWith('Email')
                            || validationError?.message?.startsWith('User not'))
                            && <span className="custom-input__error">{validationError.message}</span>
                          }
                        </label>
                      </div>
                      <div className="custom-input sign-in__input">
                        <label>
                          <span className="custom-input__label">Пароль</span>
                          <span className="custom-input__wrapper">
                            <input
                              ref={passwordRef}
                              type="password"
                              name="password"
                              minLength={ValidationSetting.passwordMinLength}
                              maxLength={ValidationSetting.passwordMaxLength}
                            />
                          </span>
                          {
                            (validationError?.message?.startsWith('Password')
                            || validationError?.message?.startsWith('User password'))
                            && <span className="custom-input__error">{validationError.message}</span>
                          }
                        </label>
                      </div>
                      <button className="btn sign-in__button" type="submit">Продолжить</button>
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

export default Login;
