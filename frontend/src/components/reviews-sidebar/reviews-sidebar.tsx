import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getReviews } from "../../store/review-process/selectors";
import { uploadReviews } from "../../store/review-process/thunk-actions";
import { Setting } from "../../consts";
import ReviewCard from "./review-card";

type ReviewSidebarProps = {
  trainingId: string;
  onAddReviewBtnClick: (status: boolean) => void;
  addReviewDisable: boolean;
  addReviewStatus: boolean;
}

function ReviewSidebarTemplate({trainingId, onAddReviewBtnClick, addReviewDisable, addReviewStatus}: ReviewSidebarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
      dispatch(uploadReviews({
        trainingId,
        query: {
          page: Setting.DefaultStartPage,
          count: Setting.MaxItemsPerPage,
          sortBy: Setting.DefaultSortBy,
          sortDirection: Setting.DefaultSortDirection
        }
      }))

  }, []);

  return(
    <aside className="reviews-side-bar">
      <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
        <span>Назад</span>
      </button>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {
          reviews &&
          reviews.entities.map((review) => <ReviewCard review={review} key={review.id} />)
        }
      </ul>
      {
        addReviewStatus
        &&
        <button
          className="btn btn--medium reviews-side-bar__button"
          type="button"
          disabled={addReviewDisable}
          onClick={() => onAddReviewBtnClick(true)}
        >Оставить отзыв</button>
      }
    </aside>
  );
}

const ReviewSidebar = memo(ReviewSidebarTemplate);

export default ReviewSidebar;
