import { memo, useState } from "react";
import DetailedTrainingCard from "../detailed-training-card/detailed-training-card";
import EmptyListCard from "../empty-list-card/empty-list-card";
import { Trainings } from "../../types/trainings";
import { Setting } from "../../consts";

type CoachTrainingsBoxProps = {
  trainings: Trainings,
  indiviDualTrainings?: boolean
}

function CoachTrainingsBoxTemplate({trainings, indiviDualTrainings}: CoachTrainingsBoxProps): JSX.Element {
  const [startIndex, setStartIndex] = useState(0);

  return(
    <div className="user-card-coach__training">
                        <div className="user-card-coach__training-head">
                          <h2 className="user-card-coach__training-title">Тренировки</h2>
                          <div className="user-card-coach__training-bts">
                            <button
                              className="btn-icon user-card-coach__training-btn"
                              type="button"
                              aria-label="back"
                              disabled={startIndex === Setting.PopularSliderStep - 1}
                              onClick={() => setStartIndex(startIndex - Setting.PopularSliderStep)}
                            >
                              <svg width="14" height="10" aria-hidden="true">
                                <use xlinkHref="#arrow-left"></use>
                              </svg>
                            </button>
                            <button
                              className="btn-icon user-card-coach__training-btn"
                              type="button"
                              aria-label="next"
                              disabled={
                                startIndex === (Setting.MaxPopularTrainingCount - Setting.PopularCardPerStep) ||
                                startIndex === (trainings.length - Setting.PopularCardPerStep)
                              }
                              onClick={() => setStartIndex(startIndex + Setting.PopularSliderStep)}
                              >
                              <svg width="14" height="10" aria-hidden="true">
                                <use xlinkHref="#arrow-right"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <ul className="user-card-coach__training-list">
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
                        <form className="user-card-coach__training-form">
                          {
                            indiviDualTrainings &&
                            <button
                              className="btn user-card-coach__btn-training"
                              type="button">Хочу персональную тренировку
                            </button>
                          }
                          {
                            /*
                            <div className="user-card-coach__training-check">
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label>
                                  <input type="checkbox" value="user-agreement-1" name="user-agreement" checked />
                                  <span className="custom-toggle__icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span>
                                  <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                                </label>
                              </div>
                            </div>*/
                          }
                        </form>
                      </div>
  );
}

const CoachTrainingsBox = memo(CoachTrainingsBoxTemplate);

export default CoachTrainingsBox;
