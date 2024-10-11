function MyOrders(): JSX.Element {
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
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button className="btn-flat btn-flat--underlined my-orders__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button className="btn-filter-sort" type="button"><span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-up"></use>
                      </svg>
                    </button>
                    <button className="btn-filter-sort" type="button"><span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-down"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                <li className="my-orders__item">
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
                      <h2 className="thumbnail-training__title">energy</h2>
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
                      <a className="btn-flat btn-flat--underlined thumbnail-training__button-orders" href="#">
                        <svg width="18" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-info"></use>
                        </svg><span>Подробнее</span>
                      </a>
                    </div>
                    <div className="thumbnail-training__total-info">
                      <div className="thumbnail-training__total-info-card">
                        <svg width="32" height="32" aria-hidden="true">
                          <use xlinkHref="#icon-chart"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">1</p>
                        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
                      </div>
                      <div className="thumbnail-training__total-info-card">
                        <svg width="31" height="28" aria-hidden="true">
                          <use xlinkHref="#icon-wallet"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">800<span>₽</span></p>
                        <p className="thumbnail-training__total-info-text">Общая сумма</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="my-orders__item">
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
                      <h2 className="thumbnail-training__title">boxing</h2>
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
                      <a className="btn-flat btn-flat--underlined thumbnail-training__button-orders" href="#">
                        <svg width="18" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-info"></use>
                        </svg><span>Подробнее</span>
                      </a>
                    </div>
                    <div className="thumbnail-training__total-info">
                      <div className="thumbnail-training__total-info-card">
                        <svg width="32" height="32" aria-hidden="true">
                          <use xlinkHref="#icon-chart"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">5</p>
                        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
                      </div>
                      <div className="thumbnail-training__total-info-card">
                        <svg width="31" height="28" aria-hidden="true">
                          <use xlinkHref="#icon-wallet"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">5 000<span>₽</span></p>
                        <p className="thumbnail-training__total-info-text">Общая сумма</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="my-orders__item">
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
                      <h2 className="thumbnail-training__title">antistress</h2>
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
                      <a className="btn-flat btn-flat--underlined thumbnail-training__button-orders" href="#">
                        <svg width="18" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-info"></use>
                        </svg><span>Подробнее</span>
                      </a>
                    </div>
                    <div className="thumbnail-training__total-info">
                      <div className="thumbnail-training__total-info-card">
                        <svg width="32" height="32" aria-hidden="true">
                          <use xlinkHref="#icon-chart"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">8</p>
                        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
                      </div>
                      <div className="thumbnail-training__total-info-card">
                        <svg width="31" height="28" aria-hidden="true">
                          <use xlinkHref="#icon-wallet"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">11 200<span>₽</span></p>
                        <p className="thumbnail-training__total-info-text">Общая сумма</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="my-orders__item">
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
                      <h2 className="thumbnail-training__title">power</h2>
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
                      <a className="btn-flat btn-flat--underlined thumbnail-training__button-orders" href="#">
                        <svg width="18" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-info"></use>
                        </svg><span>Подробнее</span>
                      </a>
                    </div>
                    <div className="thumbnail-training__total-info">
                      <div className="thumbnail-training__total-info-card">
                        <svg width="32" height="32" aria-hidden="true">
                          <use xlinkHref="#icon-chart"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">12</p>
                        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
                      </div>
                      <div className="thumbnail-training__total-info-card">
                        <svg width="31" height="28" aria-hidden="true">
                          <use xlinkHref="#icon-wallet"></use>
                        </svg>
                        <p className="thumbnail-training__total-info-value">14 400<span>₽</span></p>
                        <p className="thumbnail-training__total-info-text">Общая сумма</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="show-more my-orders__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MyOrders;
