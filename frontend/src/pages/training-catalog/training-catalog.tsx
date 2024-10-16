function TrainingCatalog(): JSX.Element {
  return(
    <div className="wrapper">
      <header className="header">
        <div className="container"><a className="header__logo" href="index.html" aria-label="Переход на главную">
            <svg width="187" height="70" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg></a>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="main-nav__link is-active" href="#" aria-label="На главную">
                  <svg width="18" height="18" aria-hidden="true">
                    <use xlinkHref="#icon-home"></use>
                  </svg></a></li>
              <li className="main-nav__item"><a className="main-nav__link" href="#" aria-label="Личный кабинет">
                  <svg width="16" height="18" aria-hidden="true">
                    <use xlinkHref="#icon-user"></use>
                  </svg></a></li>
              <li className="main-nav__item"><a className="main-nav__link" href="#" aria-label="Друзья">
                  <svg width="22" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-friends"></use>
                  </svg></a></li>
              <li className="main-nav__item main-nav__item--notifications"><a className="main-nav__link" href="#" aria-label="Уведомления">
                  <svg width="14" height="18" aria-hidden="true">
                    <use xlinkHref="#icon-notification"></use>
                  </svg></a>
                <div className="main-nav__dropdown">
                  <p className="main-nav__label">Оповещения</p>
                  <ul className="main-nav__sublist">
                    <li className="main-nav__subitem"><a className="notification is-active" href="#">
                        <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                        <time className="notification__time" dateTime="2023-12-23 12:35">23 декабря, 12:35</time></a>
                    </li>
                    <li className="main-nav__subitem"><a className="notification is-active" href="#">
                        <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                        <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time></a>
                    </li>
                    <li className="main-nav__subitem"><a className="notification is-active" href="#">
                        <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                        <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time></a>
                    </li>
                    {/*<li className="main-nav__subitem"><a className="notification" href="#">
                        <p className="notification__text">Наталья приняла приглашение на&nbsp;совместную тренировку</p>
                        <time className="notification__time" dateTime="2023-12-14 08:15">14 декабря, 08:15</time></a>
                    </li>*/}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          <div className="search">
            <form action="#" method="get">
              <label><span className="search__label">Поиск</span>
                <input type="search" name="search" />
                <svg className="search__icon" width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-search"></use>
                </svg>
              </label>
              <ul className="search__list">
                <li className="search__item"><a className="search__link" href="#">Бокс</a></li>
                <li className="search__item"><a className="search__link is-active" href="#">Бег</a></li>
                <li className="search__item"><a className="search__link" href="#">Аэробика</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
              </ul>
            </form>
          </div>
        </div>
      </header>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button className="btn-flat btn-flat--underlined gym-catalog-form__btnback" type="button">
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form">
                    <div className="gym-catalog-form__block gym-catalog-form__block--price">
                      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input type="number" id="text-min" name="text-min" value="0" />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input type="number" id="text-max" name="text-max" value="3200" />
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <div className="filter-range__scale">
                          <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                        </div>
                        <div className="filter-range__control">
                          <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                          <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
                        </div>
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                      <h4 className="gym-catalog-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input type="number" id="text-min-cal" name="text-min-cal" />
                          <label htmlFor="text-min-cal">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input type="number" id="text-max-cal" name="text-max-cal" />
                          <label htmlFor="text-max-cal">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <div className="filter-range__scale">
                          <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                        </div>
                        <div className="filter-range__control">
                          <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                          <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
                        </div>
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                      <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <div className="filter-raiting__scale">
                          <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                        </div>
                        <div className="filter-raiting__control">
                          <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
                          <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
                        </div>
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--type">
                      <h4 className="gym-catalog-form__block-title">Тип</h4>
                      <ul className="gym-catalog-form__check-list">
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">йога</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">силовые</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type" name="type" checked /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">кроссфит</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" checked /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">бокс</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">бег</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">аэробика</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">пилатес</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">стрейчинг</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                      <div className="btn-radio-sort gym-catalog-form__radio">
                        <label>
                          <input type="radio" name="sort" checked /><span className="btn-radio-sort__label">Дешевле</span>
                        </label>
                        <label>
                          <input type="radio" name="sort" /><span className="btn-radio-sort__label">Дороже</span>
                        </label>
                        <label>
                          <input type="radio" name="sort" /><span className="btn-radio-sort__label">Бесплатные</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-02.webp, img/content/thumbnails/training-02@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-02.jpg" srcSet="img/content/thumbnails/training-02@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price">Бесплатно
                        </p>
                        <h3 className="thumbnail-training__title">crossfit</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#1200ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">5</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Сложный комплекс упражнений для профессиональных атлетов на&nbsp;отработку показателей в&nbsp;классическом стиле.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-01.webp, img/content/thumbnails/training-01@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-01.jpg" srcSet="img/content/thumbnails/training-01@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">800</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">energy</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#пилатес</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#320ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">4</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-03.webp, img/content/thumbnails/training-03@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-03.jpg" srcSet="img/content/thumbnails/training-03@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1000</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">boxing</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#бокс</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#800ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">5</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Тренировка на&nbsp;отработку правильных ударов, координации и&nbsp;оптимальной механики защитных движений.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-04.webp, img/content/thumbnails/training-04@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-04.jpg" srcSet="img/content/thumbnails/training-04@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1200</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">power</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#силовые</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#600ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">4</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Тренировка на&nbsp;отработку правильной техники работы с&nbsp;тяжелыми весами, укрепления мышц кора и&nbsp;спины.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-05.webp, img/content/thumbnails/training-05@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-05.jpg" srcSet="img/content/thumbnails/training-05@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1400</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">antistress</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#йога</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#250ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">5</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">В&nbsp;основе программы лежит работа с&nbsp;телом и&nbsp;с&nbsp;психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-06.jpg" srcSet="img/content/thumbnails/training-06@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1600</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">run, forrest, run</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#бег</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#500ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">5</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Узнайте правильную технику бега, развивайте выносливость и&nbsp;откройте для себя все секреты длительных пробежек.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-07.webp, img/content/thumbnails/training-07@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-07.jpg" srcSet="img/content/thumbnails/training-07@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1600</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">fitball</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#пилатес</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#200ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">5</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Тренировка на&nbsp;фитболе&nbsp;&mdash; отличном тренажере для развития чувства баланса и&nbsp;равновесия, улучшения координации.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-08.webp, img/content/thumbnails/training-08@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-08.jpg" srcSet="img/content/thumbnails/training-08@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1800</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">hatha</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#йога</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#350ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">4</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Упражнения по&nbsp;хатха йоге, направленные на&nbsp;понижение нервной возбудимости и&nbsp;активацию процессов анаболизма.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-09.webp, img/content/thumbnails/training-09@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-09.jpg" srcSet="img/content/thumbnails/training-09@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1800</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">full body stretch</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#стретчинг</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#400ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">5</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Комплекс упражнений на&nbsp;растяжку всего тела для новичков. Плавное погружение в&nbsp;стретчинг и&nbsp;умеренная нагрузка.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-10.webp, img/content/thumbnails/training-10@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-10.jpg" srcSet="img/content/thumbnails/training-10@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">2000</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">upper body</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#силовые</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#800ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">4</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Проработка мышц груди для профи, экспериментируем с&nbsp;уровнем наклона скамьи и&nbsp;различной шириной хвата.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-11.webp, img/content/thumbnails/training-11@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-11.jpg" srcSet="img/content/thumbnails/training-11@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">2200</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">devil's cindy</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#950ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">5</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Знаменитый кроссфит комплекс. Синди&nbsp;&mdash; универсальная тренировка для развития функциональной силы.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="training-catalog__item">
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/training-12.webp, img/content/thumbnails/training-12@2x.webp 2x" />
                            <img src="img/content/thumbnails/training-12.jpg" srcSet="img/content/thumbnails/training-12@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">2400</span><span>₽</span>
                        </p>
                        <h3 className="thumbnail-training__title">fleksbend</h3>
                        <div className="thumbnail-training__info">
                          <ul className="thumbnail-training__hashtags-list">
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#аэробика</span></div>
                            </li>
                            <li className="thumbnail-training__hashtags-item">
                              <div className="hashtag thumbnail-training__hashtag"><span>#450ккал</span></div>
                            </li>
                          </ul>
                          <div className="thumbnail-training__rate">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span className="thumbnail-training__rate-value">4</span>
                          </div>
                        </div>
                        <div className="thumbnail-training__text-wrapper">
                          <p className="thumbnail-training__text">Тренируясь с&nbsp;резинкой для фитнеса, вы можете проработать почти все мышечные группы и&nbsp;разнообразить тренировки.</p>
                        </div>
                        <div className="thumbnail-training__button-wrapper">
                          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="show-more training-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TrainingCatalog;
