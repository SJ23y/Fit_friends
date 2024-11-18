import {  Setting } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getQuery, getTrainings } from "../../store/main-process/selectors";
import { useEffect } from "react";
import { uploadTrainings } from "../../store/thunk-actions";
import DetailedTrainingCard from "../../components/detailed-training-card/detailed-training-card";
import EmptyListCard from "../../components/empty-list-card/empty-list-card";
import TrainingFilterBoxUser from "../../components/trainings-filter-box/trainings-filter-box-user";

function TrainingCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const paginatedTrainings = useAppSelector(getTrainings);
  const query = useAppSelector(getQuery);

  const showMoreButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (paginatedTrainings) {
      dispatch(uploadTrainings({
        ...query,
        page: paginatedTrainings?.currentPage + 1
      }));
    }
  }

  useEffect(() => {
    dispatch(uploadTrainings({
      page: Setting.DefaultStartPage,
      count: Setting.TrainingsCatalogItemsPerPage,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    }))
  }, []);

  useEffect(() => {
    dispatch(uploadTrainings(query));
  }, [query]);

  return(
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              {
                paginatedTrainings &&
                <TrainingFilterBoxUser
                  maxPrice={paginatedTrainings.maxPrice}
                  minPrice={paginatedTrainings.minPrice}
                  minCallories={paginatedTrainings.minCallories}
                  maxCallories={paginatedTrainings.maxCallories}
                />
              }
              {
                paginatedTrainings?.entities &&
                paginatedTrainings?.entities.length > 0 &&
                <div className="training-catalog">

                  <ul className="training-catalog__list">
                    {
                      paginatedTrainings.entities.map((training) => (
                        <li className="training-catalog__item">
                          <DetailedTrainingCard training={training} key={training.id} />
                        </li>
                      ))
                    }
                  </ul>
                    <div className="show-more training-catalog__show-more">
                      {
                        paginatedTrainings?.currentPage !== paginatedTrainings?.totalPages &&
                          <button
                            className="btn show-more__button show-more__button--more"
                            type="button"
                            onClick={showMoreButtonClickHandler}
                          >
                            Показать еще
                          </button>
                      }
                      {
                        paginatedTrainings?.currentPage &&
                        paginatedTrainings.currentPage === paginatedTrainings?.totalPages &&
                        paginatedTrainings.currentPage > 1 &&
                        <button
                          className="btn show-more__button show-more__button--to-top"
                          type="button"
                          onClick={() => window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                          })}
                        >
                            Вернуться в начало

                        </button>
                      }
                    </div>
                </div>
              }
              {
                paginatedTrainings?.entities &&
                paginatedTrainings?.entities.length === 0 &&
                <div className="training-catalog">
                  <EmptyListCard />
                </div>
              }

            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TrainingCatalog;
