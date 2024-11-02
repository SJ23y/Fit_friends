import { memo, useState } from "react";
import { AppRoute, Setting } from "../../consts";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { getPopularlTrainings } from "../../store/main-process/selectors";
import { useNavigate } from "react-router-dom";
import DetailedTrainingCard from "../detailed-training-card/detailed-training-card";
import EmptyListCard from "../empty-list-card/empty-list-card";

function PopularTrainingsBoxTemplate(): JSX.Element {
  const [startIndex, setStartIndex] = useState(0);
  const trainings = useAppSelector(getPopularlTrainings);
  const navigate = useNavigate();

  return(
    <section className="popular-trainings">
          <div className="container">
            <div className="popular-trainings__wrapper">
              <div className="popular-trainings__title-wrapper">
                <h2 className="popular-trainings__title">Популярные тренировки</h2>
                <button
                  className="btn-flat popular-trainings__button"
                  type="button"
                  onClick={() => navigate(AppRoute.Trainings)
                }>
                  <span>Смотреть все</span>
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
                {
                  trainings &&
                  <div className="popular-trainings__controls">
                    <button
                      className="btn-icon popular-trainings__control"
                      type="button"
                      aria-label="previous"
                      disabled={startIndex === Setting.PopularSliderStep - 1}
                      onClick={() => setStartIndex(startIndex - Setting.PopularSliderStep)}
                    >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-left"></use>
                      </svg>
                    </button>
                    <button
                      className="btn-icon popular-trainings__control"
                      type="button"
                      aria-label="next"
                      disabled={
                        startIndex === (Setting.MaxPopularTrainingCount - Setting.PopularCardPerStep) ||
                        startIndex === (trainings.length - Setting.PopularCardPerStep)
                      }
                      onClick={() => setStartIndex(startIndex + Setting.PopularSliderStep)}
                      >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-right"></use>
                      </svg>
                    </button>
                  </div>
                }
              </div>
              <ul className="popular-trainings__list">
              {
                  trainings &&
                  trainings
                  .slice(startIndex, startIndex + Setting.PopularCardPerStep)
                  .map((training) => (
                    <li className="popular-trainings__item" key={`popular-${training.id}`}>
                      <DetailedTrainingCard training={training}  />
                    </li>
                  ))
                }
                {
                  trainings && trainings.length === 0
                  && <EmptyListCard />
                }
              </ul>
            </div>
          </div>
        </section>
  );
}

const PopularTrainingsBox = memo(PopularTrainingsBoxTemplate);

export default PopularTrainingsBox;
