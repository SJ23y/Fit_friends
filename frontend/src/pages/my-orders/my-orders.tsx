import { useNavigate } from "react-router-dom";
import { AppRoute, Role, Setting, SortBy, SortDirection } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getOrders } from "../../store/purchase-process/selectors";
import { uploadCoachOrders, uploadPurchases } from "../../store/purchase-process/thunk-actions";
import React, { useEffect, useState } from "react";
import DetailedTrainingCard from "../../components/detailed-training-card/detailed-training-card";
import { getUserInfo } from "../../store/user-process/selectors";
import EmptyListCard from "../../components/empty-list-card/empty-list-card";


function MyOrders(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserInfo);
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
    if (user?.role !== Role.COACH) {
      navigate(AppRoute.Main);
    } else {
    dispatch(uploadCoachOrders({
      page: Setting.DefaultStartPage,
      count: Setting.OrdersPerPageCount,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    }))
  }
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
                {
                  paginatedOrders?.entities &&
                  paginatedOrders?.entities.length === 0 &&
                  <div className="training-catalog">
                    <EmptyListCard />
                  </div>
                }
              </ul>

                <div className="show-more my-orders__show-more">
                  {
                    paginatedOrders?.totalPages !== undefined &&
                    paginatedOrders.totalPages > 1 &&
                    paginatedOrders?.currentPage !== paginatedOrders?.totalPages &&

                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={showMoreButtonClickHandler}
                    >
                      Показать еще
                    </button>
                  }
                  {
                    paginatedOrders?.currentPage &&
                    paginatedOrders.currentPage === paginatedOrders?.totalPages &&
                    paginatedOrders.currentPage > 1 &&
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
          </div>
        </section>
      </main>
  )
}

export default MyOrders;
