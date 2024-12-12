import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getUserCardInfo, getUserInfo } from "../../store/user-process/selectors";
import { useEffect, useState } from "react";
import { getUserById } from "../../store/user-process/thunk-actions";
import { Role } from "../../consts";
import CoachInfoCard from "../../components/coach-info-card/coach-info-card";
import UserInfoCard from "../../components/user-info-card/user-info-card";
import { addNewFriend, deleteFriend } from "../../store/friends-process/thunk-actions";
import { addFriendToUser, deleteFriendFromUser } from "../../store/user-process/user-process";
import { isUserQuestionnaire } from "../../utils";

function UserCard(): JSX.Element {
  const loggedUser = useAppSelector(getUserInfo);
  const viewedUser = useAppSelector(getUserCardInfo);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const {userId} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isReadyForTraining = (loggedUser && isUserQuestionnaire(loggedUser.questionnaire)) ? loggedUser.questionnaire.isReadyForTrain: false;
  const isNotHasRequest = loggedUser!.requests.every((request) => request.recieverId !== viewedUser?.id);

  const addFriendClickHandler = () => {
    if (viewedUser?.id && loggedUser?.id) {
      dispatch(addNewFriend(viewedUser.id));
      dispatch(addFriendToUser({
        userId: loggedUser.id,
        friendId: viewedUser.id
      }));
    }
  }

  const deleteFriendClickHandler = () => {
    if (viewedUser?.id) {
      dispatch(deleteFriend(viewedUser.id));
      dispatch(deleteFriendFromUser(viewedUser.id));
    }
  }

  useEffect(() => {
    if (userId && viewedUser?.id !== userId) {
      dispatch(getUserById(userId));
    }
  }, [])

  useEffect(() => {
    if (viewedUser?.friends && viewedUser.friends.length > 0) {
      console.log(loggedUser?.id, viewedUser.friends);
      const status = viewedUser.friends.some((friend) => friend.friendId === loggedUser?.id || friend.userId === loggedUser?.id);
      setIsFriend(status);
    } else {
      setIsFriend(false);
    }
  }, [viewedUser])

  return(
    <main>
        {
          viewedUser &&
          <div className="inner-page inner-page--no-sidebar">
            <div className="container">
              <div className="inner-page__wrapper">
                <button
                  className="btn-flat inner-page__back"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                  <span>Назад</span>
                </button>
                { viewedUser.role === Role.COACH &&
                  <CoachInfoCard
                    user={viewedUser}
                    onAddFriend={addFriendClickHandler}
                    onDeleteFriend={deleteFriendClickHandler}
                    isFriend={isFriend}
                    isReadyForTraining={isReadyForTraining && isNotHasRequest}
                    loggedUserId={loggedUser!.id}
                  />
                }
                {
                  viewedUser.role === Role.USER &&
                  <UserInfoCard
                    user={viewedUser}
                    onAddFriend={addFriendClickHandler}
                    onDeleteFriend={deleteFriendClickHandler}
                    isFriend={isFriend}
                  />
                }
              </div>
            </div>
          </div>
        }
      </main>
  );
}

export default UserCard;
