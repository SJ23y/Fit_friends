import { useNavigate } from "react-router-dom";
import { AppRoute, FilterBy, Setting, SortBy, SortDirection } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getPurchases } from "../../store/purchase-process/selectors";
import { uploadPurchases } from "../../store/purchase-process/thunk-actions";
import React, { useEffect, useState } from "react";
import DetailedTrainingCard from "../../components/detailed-training-card/detailed-training-card";

function MyPurchases(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const paginatedPurhases = useAppSelector(getPurchases);
  const [activeFlag, setActiveFlag] = useState(false);


  const showMoreButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (paginatedPurhases) {
      dispatch(uploadPurchases({
        page: paginatedPurhases?.currentPage + 1,
        count: Setting.OrdersPerPageCount,
        sortBy: Setting.DefaultSortBy,
        sortDirection: Setting.DefaultSortDirection
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

  useEffect(() => {
    if (activeFlag) {
      dispatch(uploadPurchases({
        page: Setting.DefaultStartPage,
        count: Setting.OrdersPerPageCount,
        sortBy: Setting.DefaultSortBy,
        sortDirection: Setting.DefaultSortDirection,
        filterBy: FilterBy.ACTIVE_PURCHASE
      }))
    } else {
      dispatch(uploadPurchases({
        page: Setting.DefaultStartPage,
        count: Setting.OrdersPerPageCount,
        sortBy: Setting.DefaultSortBy,
        sortDirection: Setting.DefaultSortDirection
      }))
    }
  }, [activeFlag]);

  return(
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button
                className="btn-flat my-purchases__back"
                type="button"
                onClick={() => navigate(AppRoute.Main)}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>

              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement-1"
                        name="user-agreement"
                        checked={activeFlag}
                        onChange={() => setActiveFlag(!activeFlag)}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
              {
                  paginatedPurhases?.entities.map((purchase) => (
                    purchase.train &&
                    <li className="my-purchases__item">
                      <DetailedTrainingCard
                        training={purchase.train}
                        key={`train-card-${purchase.id}`}
                      />
                    </li>
                  ))
                }
              </ul>
              {
                paginatedPurhases?.currentPage !== paginatedPurhases?.totalPages &&
                <div className="show-more my-purchases__show-more">
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

export default MyPurchases;
