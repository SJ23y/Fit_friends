import { memo, useState } from "react";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { getSpecialTrainings } from "../../store/main-process/selectors";
import SpecialTrainingCard from "./special-training-card";

function SpecialTrainingsBoxTemplate(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(1);
  const trainings = useAppSelector(getSpecialTrainings);
  return(
    <section className="special-offers">
          <div className="container">
            {
              trainings &&
              <div className="special-offers__wrapper">
                <h2 className="visually-hidden">Специальные предложения</h2>
                <ul className="special-offers__list">
                  {
                    trainings.map((training, index) => (
                      <SpecialTrainingCard
                        trainingsCount={trainings.length}
                        training={training}
                        trainingIndex={index + 1}
                        currentIndex={currentIndex}
                        onPromoSliderBtnClick={(index) => setCurrentIndex(index)}
                        key={training.id}
                      />
                    ))
                  }
                </ul>
                {
                  trainings.length < 3 &&
                  <div className="thumbnail-spec-gym">
                    <div className="thumbnail-spec-gym__image">
                      <picture>
                        <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                        <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                      </picture>
                    </div>
                    <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                    <div className="thumbnail-spec-gym__header">
                      <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                    </div>
                  </div>
                }

              </div>
            }
          </div>
    </section>
  );
}

const SpecialTrainingsBox = memo(SpecialTrainingsBoxTemplate);

export default SpecialTrainingsBox;
