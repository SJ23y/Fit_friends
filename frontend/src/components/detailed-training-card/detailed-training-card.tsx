import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute, Setting } from "../../consts";
import { Training } from "../../types/trainings";

type DetailedTrainingCardProps = {
  training: Training,
  totalPrice?: number,
  totalCount?: number,
  isCoachCard?: boolean
}

function DetailedTrainingCardTemplate({training, totalPrice, totalCount, isCoachCard}: DetailedTrainingCardProps): JSX.Element {
  const navigate = useNavigate();

  const trainingLinkClickHandler = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    navigate((isCoachCard) ? `${AppRoute.Edit}/${training.id}` : `${AppRoute.Training}/${training.id}`)
  }

  return(
    <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={`${Setting.BaseUrl}/${training.image}`} />
              <img src={`${Setting.BaseUrl}/${training.image}`}  width="330" height="190" alt={training.title} />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{(training.price === 0) ? 'free' : training.price}</span>
            <span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{training.title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{training.type}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{training.callorieQuantity}ккал</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">{training.rate}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{training.description}</p>
          </div>
          {
            !totalCount && !totalPrice &&
            <div className="thumbnail-training__button-wrapper">
              <Link
                className="btn btn--small thumbnail-training__button-catalog"
                to={(isCoachCard) ? `${AppRoute.Edit}/${training.id}` : `${AppRoute.Training}/${training.id}`}
                onClick={trainingLinkClickHandler}
              >Подробнее</Link>
              <Link
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                to="#"
              >Отзывы</Link>
            </div>
          }
          {
            totalCount !== undefined && totalPrice &&
            <Link
              className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
              to={(isCoachCard) ? `${AppRoute.Edit}/${training.id}` : `${AppRoute.Training}/${training.id}`}
              onClick={trainingLinkClickHandler}
            >
              <svg width="18" height="18" aria-hidden="true">
                <use xlinkHref="#icon-info"></use>
              </svg><span>Подробнее</span>
            </Link>
          }
        </div>
        {
          totalCount !== undefined && totalPrice &&
          <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{totalCount}</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{totalPrice}<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
          </div>
        }
    </div>
  );
}

const DetailedTrainingCard = memo(DetailedTrainingCardTemplate);

export default DetailedTrainingCard;
