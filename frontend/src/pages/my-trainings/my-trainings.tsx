import {  AppRoute, FilterBy, Role, Setting } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getMainLoadingStatus, getQuery, getTrainings } from "../../store/main-process/selectors";
import { useEffect } from "react";
import DetailedTrainingCard from "../../components/detailed-training-card/detailed-training-card";
import EmptyListCard from "../../components/empty-list-card/empty-list-card";
import TrainingFilterBoxCoach from "../../components/trainings-filter-box/trainings-filter-box-coach";
import { getUserInfo } from "../../store/user-process/selectors";
import { useNavigate } from "react-router-dom";
import { uploadTrainings } from "../../store/main-process/thunk-actions";
import Loader from "../../components/loader/loader";


function MyTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUserInfo);
  const paginatedTrainings = useAppSelector(getTrainings);
  const query = useAppSelector(getQuery);
  const loadingStatus = useAppSelector(getMainLoadingStatus)

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
    if (user?.role !== Role.COACH) {
      navigate(AppRoute.Main);
    } else {
      dispatch(uploadTrainings({
        page: Setting.DefaultStartPage,
        count: Setting.TrainingsCatalogItemsPerPage,
        sortBy: Setting.DefaultSortBy,
        sortDirection: Setting.DefaultSortDirection,
        filterBy: FilterBy.COACH
      }));
    }
  }, [])

  useEffect(() => {
    dispatch(uploadTrainings({...query, filterBy: FilterBy.COACH}));
  }, [query])

  if (loadingStatus) {
    return <Loader />
  }

  return(
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              {
                paginatedTrainings &&
                <TrainingFilterBoxCoach
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
                      paginatedTrainings.entities.map((training, index) => (
                        <li className="training-catalog__item" key={`training-${training.id}-${index}`}>
                          <DetailedTrainingCard training={training}  isCoachCard={true} />
                        </li>
                      ))
                    }
                  </ul>

                    <div className="show-more training-catalog__show-more">
                      {
                        paginatedTrainings?.currentPage !== paginatedTrainings?.totalPages &&
                        <>
                          <button
                            className="btn show-more__button show-more__button--more"
                            type="button"
                            onClick={showMoreButtonClickHandler}
                          >
                            Показать еще
                          </button>
                        </>
                      }
                      {
                        paginatedTrainings?.currentPage &&
                        paginatedTrainings.currentPage > 1 &&
                        paginatedTrainings.currentPage === paginatedTrainings?.totalPages &&
                        <button
                          className="btn show-more__button show-more__button--to-top"
                          type="button"
                          onClick={() => window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
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

export default MyTrainings;
