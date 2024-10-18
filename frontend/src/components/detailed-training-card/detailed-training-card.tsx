import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute, Setting } from "../../consts";
import { Training } from "../../types/trainings";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { changeCurrentTraining } from "../../store/training-process/training-process";

type DetailedTrainingCardProps = {
  training: Training
}

function DetailedTrainingCardTemplate({training}: DetailedTrainingCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const trainingLinkClickHandler = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCurrentTraining(training));
    navigate(`${AppRoute.Training}/${training.id}`)
  }

  return(
    <li className="popular-trainings__item">
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
          <div className="thumbnail-training__button-wrapper">
            <Link
              className="btn btn--small thumbnail-training__button-catalog"
              to={`${AppRoute.Training}/${training.id}`}
              onClick={trainingLinkClickHandler}
            >Подробнее</Link>
            <Link
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
              to="#"
            >Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

const DetailedTrainingCard = memo(DetailedTrainingCardTemplate);

export default DetailedTrainingCard;
