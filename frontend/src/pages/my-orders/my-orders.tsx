import { useNavigate } from "react-router-dom";
import { AppRoute, Setting, SortBy, SortDirection } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getOrders } from "../../store/purchase-process/selectors";
import { uploadCoachOrders, uploadPurchases } from "../../store/purchase-process/thunk-actions";
import React, { useEffect, useState } from "react";
import DetailedTrainingCard from "../../components/detailed-training-card/detailed-training-card";


function MyOrders(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentSorting, setCurrentSorting] = useState({sortBy: SortBy.DATE, sortDirection: SortDirection.DESC});
  const [totalPriseSorting, setTotalPriceSorting] = useState({status: false, sortDirection: SortDirection.DESC});
  const [totalCountSorting, setTotalCountSorting] = useState({status: false, sortDirection: SortDirection.DESC});
  const paginatedOrders = useAppSelector(getOrders);

  const changeTotalPriceSortingHandler = () => {
    if (totalPriseSorting.status) {
      setCurrentSorting({
        sortBy: SortBy.TOTAL_PRICE,
        sortDirection: (totalPriseSorting.sortDirection === SortDirection.DESC) ? SortDirection.ASC : SortDirection.DESC
      });
      setTotalPriceSorting({
        status: true,
        sortDirection: (totalPriseSorting.sortDirection === SortDirection.DESC) ? SortDirection.ASC : SortDirection.DESC
      })
    } else {
      setCurrentSorting({
        sortBy: SortBy.TOTAL_PRICE,
        sortDirection: totalPriseSorting.sortDirection
      });
      setTotalPriceSorting({
        status: true,
        sortDirection: totalPriseSorting.sortDirection
      })
    }
  }

  const changeTotalCountSortingHandler = () => {
    if (totalCountSorting.status) {
      setCurrentSorting({
        sortBy: SortBy.TRAININGS_COUNT,
        sortDirection: (totalCountSorting.sortDirection === SortDirection.DESC) ? SortDirection.ASC : SortDirection.DESC
      });
      setTotalCountSorting({
        status: true,
        sortDirection: (totalCountSorting.sortDirection === SortDirection.DESC) ? SortDirection.ASC : SortDirection.DESC
      })
    } else {
      setCurrentSorting({
        sortBy: SortBy.TRAININGS_COUNT,
        sortDirection: totalCountSorting.sortDirection
      });
      setTotalCountSorting({
        status: true,
        sortDirection: totalCountSorting.sortDirection
      })
    }
  }

  const showMoreButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (paginatedOrders) {
      dispatch(uploadPurchases({
        page: paginatedOrders?.currentPage + 1,
        count: Setting.OrdersPerPageCount,
        sortBy: currentSorting.sortBy,
        sortDirection: currentSorting.sortDirection
      }));
    }
  }

  useEffect(() => {
    dispatch(uploadCoachOrders({
      page: Setting.DefaultStartPage,
      count: Setting.OrdersPerPageCount,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    }))
  }, []);

  useEffect(() => {
    if (paginatedOrders?.entities && paginatedOrders.entities.length > 1) {
      dispatch(uploadCoachOrders({
        page: Setting.DefaultStartPage,
        count: Setting.OrdersPerPageCount,
        sortBy: currentSorting.sortBy,
        sortDirection: currentSorting.sortDirection
      }));
    }
  }, [currentSorting]);


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
                      onClick={changeTotalPriceSortingHandler}
                    >
                      <span>Сумме</span>
                        {
                          totalPriseSorting.sortDirection === SortDirection.DESC &&
                          <svg width="16" height="10" aria-hidden="true">
                            <use xlinkHref="#icon-sort-up"></use>
                          </svg>
                        }
                        {
                          totalPriseSorting.sortDirection === SortDirection.ASC &&
                          <svg width="16" height="10" aria-hidden="true">
                            <use xlinkHref="#icon-sort-down"></use>
                          </svg>
                        }
                    </button>
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={changeTotalCountSortingHandler}
                    >
                      <span>Количеству</span>
                      {
                          totalCountSorting.sortDirection === SortDirection.DESC &&
                          <svg width="16" height="10" aria-hidden="true">
                            <use xlinkHref="#icon-sort-up"></use>
                          </svg>
                        }
                        {
                           totalCountSorting.sortDirection === SortDirection.ASC &&
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
                  paginatedOrders?.entities.map((order) => (
                    <DetailedTrainingCard
                      training={order}
                      isCoachCard={true}
                      totalCount={order.trainTotalCount}
                      totalPrice={order.trainTotalPrice}
                      key={`train-card-${order.id}`}
                    />
                  ))
                }
              </ul>
              {
                paginatedOrders?.currentPage !== paginatedOrders?.totalPages &&
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
