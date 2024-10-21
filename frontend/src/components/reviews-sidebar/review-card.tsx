import { memo } from "react";
import { Review } from "../../types/review";
import { Setting } from "../../consts";

type ReviewCardProps = {
  review: Review
}

function ReviewCardTemplate({review}: ReviewCardProps): JSX.Element {

  return(
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <source type="image/webp" srcSet={`${Setting.BaseUrl}/${review.author?.avatar}`} />
              <img
                src={`${Setting.BaseUrl}/${review.author?.avatar}`}
                width="64" height="64"
                alt={`${review.author?.name} avatar`} />
            </picture>
          </div>
          <span className="review__user-name">{review.author?.name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span>{review.rate}</span>
          </div>
        </div>
        <p className="review__comment">{review.content}</p>
      </div>
    </li>
  );
}


const ReviewCard = memo(ReviewCardTemplate);

export default ReviewCard;
