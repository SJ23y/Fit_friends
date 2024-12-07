import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { uploadUsers } from "../../store/user-process/thunk-actions";
import { getUserInfo, getUsers, getUsersQuery } from "../../store/user-process/selectors";
import UserListCard from "../../components/user-list-card/user-list-card";
import EmptyListCard from "../../components/empty-list-card/empty-list-card";
import UserFilterBox from "../../components/user-filter-box/user-filter-box";
import { useNavigate } from "react-router-dom";
import { AppRoute, Role, Setting } from "../../consts";

function UserCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(getUsers);
  const currentUser = useAppSelector(getUserInfo);
  const query = useAppSelector(getUsersQuery)

  const showMoreButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (users) {
      dispatch(uploadUsers({
        ...query,
        page: users?.currentPage + 1
      }));
    }
  }

  useEffect(() => {
    if (currentUser?.role === Role.COACH) {
      navigate(AppRoute.Account);
    } else {
      dispatch(
        uploadUsers({
          count: Setting.MaxUserCatalogCount,
          sortBy: Setting.DefaultSortBy,
          sortDirection: Setting.DefaultSortDirection,
          page: Setting.DefaultStartPage
        })
      );
    }

  }, [])


  return(
    <main>
  <section className="inner-page">
    <div className="container">
      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Каталог пользователей</h1>
        <div className="user-catalog-form">
          <h2 className="visually-hidden">Каталог пользователя</h2>
          <UserFilterBox />
        </div>
        <div className="inner-page__content">
          <div className="users-catalog">
            <ul className="users-catalog__list">
              {
                users?.entities &&
                users?.entities
                .map((user) => (
                  <li className="users-catalog__item" key={`catalog-item-${user.id}`}>
                    <UserListCard user={user}  />
                  </li>
                ))
              }
            </ul>
            {

              users?.entities.length === 0
              && <EmptyListCard />

            }
            <div className="show-more users-catalog__show-more">
            {
              users?.entities &&
              users?.entities.length > 0 &&
              users?.currentPage !== users?.totalPages &&
                <button
                  className="btn show-more__button show-more__button--more"
                  type="button"
                  onClick={showMoreButtonClickHandler}
                >
                  Показать еще
                </button>
            }
            {
              users?.currentPage &&
              users.currentPage === users?.totalPages &&
              users.currentPage > 1 &&
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
        </div>
      </div>
    </div>
  </section>
</main>

  )
}

export default UserCatalog;
