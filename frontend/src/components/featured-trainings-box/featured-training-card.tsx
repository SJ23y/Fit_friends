import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute, Setting } from "../../consts";
import { Training } from "../../types/trainings";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { changeCurrentTraining } from "../../store/training-process/training-process";

type FeaturedTrainingCardProps = {
  training: Training
}

function FeaturedTrainingCardTemplate({training}: FeaturedTrainingCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const trainingLinkClickHandler = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCurrentTraining(training));
    navigate(`${AppRoute.Training}/${training.id}`)
  }

  return(
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source type="image/webp" srcSet={`${Setting.BaseUrl}/${training.image}`} />
            <img src={`${Setting.BaseUrl}/${training.image}`} width="452" height="191" alt={training.title} />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{training.title}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              className="btn btn--small thumbnail-preview__button"
              to={`${AppRoute.Training}/${training.id}`}
              onClick={trainingLinkClickHandler}
            >Подробнее</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

const FeaturedTrainingCard = memo(FeaturedTrainingCardTemplate);

export default FeaturedTrainingCard;
