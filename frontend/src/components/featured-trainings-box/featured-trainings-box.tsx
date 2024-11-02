import { memo, useState } from "react";
import { Setting } from "../../consts";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { getFeaturedTrainings } from "../../store/main-process/selectors";
import FeaturedTrainingCard from "./featured-training-card";
import EmptyListCard from "../empty-list-card/empty-list-card";

function FeaturedTrainingsBoxTemplate(): JSX.Element {
  const [startIndex, setStartIndex] = useState(0);
  const trainings = useAppSelector(getFeaturedTrainings);

  return(
    <section className="special-for-you">
          <div className="container">
            <div className="special-for-you__wrapper">
              <div className="special-for-you__title-wrapper">
                <h2 className="special-for-you__title">Специально подобрано для вас</h2>
                {
                  trainings &&
                  <div className="special-for-you__controls">
                    <button
                      className="btn-icon special-for-you__control"
                      type="button"
                      aria-label="previous"
                      disabled={startIndex === Setting.FeaturedSliderStep - 1}
                      onClick={() => setStartIndex(startIndex - Setting.FeaturedSliderStep)}
                      >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-left"></use>
                      </svg>
                    </button>
                    <button
                      className="btn-icon special-for-you__control"
                      type="button"
                      aria-label="next"
                      disabled={
                        startIndex === (Setting.MaxFeaturedTrainingCount - Setting.FeaturedCardPerStep) ||
                        startIndex === (trainings.length - Setting.FeaturedCardPerStep)
                      }
                      onClick={() => setStartIndex(startIndex + Setting.FeaturedSliderStep)}
                      >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-right"></use>
                      </svg>
                    </button>
                  </div>
                }
              </div>

              <ul className="special-for-you__list">
                {
                  trainings &&
                  trainings
                  .slice(startIndex, startIndex + Setting.FeaturedCardPerStep)
                  .map((training) => <FeaturedTrainingCard training={training} key={`featured-${training.id}`} />)
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

const FeaturedTrainingsBox = memo(FeaturedTrainingsBoxTemplate);

export default FeaturedTrainingsBox;
