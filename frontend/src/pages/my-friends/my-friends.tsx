import { useNavigate } from "react-router-dom";
import { AppRoute, Setting } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getFriends } from "../../store/friends-process/selectors";
import { getUserInfo } from "../../store/user-process/selectors";
import { useEffect } from "react";
import { uploadFriends } from "../../store/friends-process/thunk-actions";
import FriendCard from "../../components/friend-card/friend-card";

function MyFriends(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const friends = useAppSelector(getFriends);
  const user = useAppSelector(getUserInfo);

  const showMoreButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (friends) {
      dispatch(uploadFriends({
        page: friends?.currentPage + 1,
        count: Setting.FriendsPerPageCount,
        sortBy: Setting.DefaultSortBy,
        sortDirection: Setting.DefaultSortDirection
      }));
    }
  }


  useEffect(() => {
    dispatch(uploadFriends({
      count: Setting.FriendsPerPageCount,
      page: Setting.DefaultStartPage,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    }))
  }, [])


  return(
    <main>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <button
              className="btn-flat friends-list__back"
              type="button"
              onClick={() => navigate(AppRoute.Account)}
            >
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-left" />
              </svg>
              <span>Назад</span>
            </button>
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
            </div>
            <ul className="friends-list__list">
              {
                friends?.entities &&
                friends.entities.map((friend, index) => (
                  <li className="friends-list__item" key={`friend-card-${index}-${friend.id}`}>
                    <FriendCard friend={friend} />
                  </li>
                ))
              }
            </ul>
        <div className="show-more friends-list__show-more">
          {
            friends?.totalPages !== undefined &&
            friends.totalPages > 1 &&
            friends?.currentPage !== friends?.totalPages &&

                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={showMoreButtonClickHandler}
                    >
                      Показать еще
                    </button>
                  }
                  {
                    friends?.currentPage &&
                    friends.currentPage === friends?.totalPages &&
                    friends.currentPage > 1 &&
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

)};

export default MyFriends;
