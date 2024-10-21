import { useNavigate } from "react-router-dom";
import { AppRoute, Setting, SortBy, SortDirection } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getPurchases } from "../../store/purchase-process/selectors";
import { uploadPurchases } from "../../store/purchase-process/thunk-actions";
import React, { useEffect, useState } from "react";
import DetailedTrainingCard from "../../components/detailed-training-card/detailed-training-card";

function MyOrders(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentSortBy, setCurrentSortBy] = useState<SortBy>(Setting.DefaultSortBy);
  const [currentSortDirection, setCurrentSortDirection] = useState<SortDirection>(Setting.DefaultSortDirection);
  const paginatedPurhases = useAppSelector(getPurchases);

  const changeSortingHandler = (sortBy: SortBy) => {
    if (currentSortBy === sortBy) {
      setCurrentSortDirection(
        (currentSortDirection === SortDirection.ASC) ? SortDirection.DESC : SortDirection.ASC
      )
      dispatch(uploadPurchases({
        page: Setting.DefaultStartPage,
        count: Setting.OrdersPerPageCount,
        sortBy: sortBy,
        sortDirection: (currentSortDirection === SortDirection.ASC) ? SortDirection.DESC : SortDirection.ASC
      }))
    } else {
      setCurrentSortBy(sortBy);
      dispatch(uploadPurchases({
        page: Setting.DefaultStartPage,
        count: Setting.OrdersPerPageCount,
        sortBy: sortBy,
        sortDirection: currentSortDirection
      }))
    }

  }

  const showMoreButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (paginatedPurhases) {
      dispatch(uploadPurchases({
        page: paginatedPurhases?.currentPage + 1,
        count: Setting.OrdersPerPageCount,
        sortBy: currentSortBy,
        sortDirection:currentSortDirection
      }));
    }
  }

  useEffect(() => {
    dispatch(uploadPurchases({
      page: Setting.DefaultStartPage,
      count: Setting.OrdersPerPageCount,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    }))
  }, []);

  return(

      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button
                className="btn-flat btn-flat--underlined my-orders__back"
                type="button"
                onClick={() => navigate(AppRoute.Main)}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>

              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={() => changeSortingHandler(SortBy.TOTAL_PRICE)}
                    >
                      <span>Сумме</span>
                        {
                          currentSortDirection === SortDirection.DESC &&
                          <svg width="16" height="10" aria-hidden="true">
                            <use xlinkHref="#icon-sort-up"></use>
                          </svg>
                        }
                        {
                          currentSortDirection === SortDirection.ASC &&
                          <svg width="16" height="10" aria-hidden="true">
                            <use xlinkHref="#icon-sort-down"></use>
                          </svg>
                        }
                    </button>
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={() => changeSortingHandler(SortBy.TRAININGS_COUNT)}
                    >
                      <span>Количеству</span>
                      {
                          currentSortDirection === SortDirection.DESC &&
                          <svg width="16" height="10" aria-hidden="true">
                            <use xlinkHref="#icon-sort-up"></use>
                          </svg>
                        }
                        {
                          currentSortDirection === SortDirection.ASC &&
                          <svg width="16" height="10" aria-hidden="true">
                            <use xlinkHref="#icon-sort-down"></use>
                          </svg>
                        }
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {
                  paginatedPurhases?.entities.map((purchase) => (
                    purchase.train &&
                    <DetailedTrainingCard
                      training={purchase.train}
                      totalCount={purchase.trainCount}
                      totalPrice={purchase.totalPrice}
                      key={`train-card-${purchase.id}`}
                    />
                  ))
                }
              </ul>
              {
                paginatedPurhases?.currentPage !== paginatedPurhases?.totalPages &&
                <div className="show-more my-orders__show-more">
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={showMoreButtonClickHandler}
                  >
                    Показать еще
                  </button>
                  <button
                    className="btn show-more__button show-more__button--to-top"
                    type="button"
                  >
                    Вернуться в начало
                  </button>
                </div>
              }
            </div>
          </div>
        </section>
      </main>
  )
}

export default MyOrders;
