import { memo, useState } from "react";
import { AppRoute, Setting } from "../../consts";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { useNavigate } from "react-router-dom";
import EmptyListCard from "../empty-list-card/empty-list-card";
import { getUsers } from "../../store/user-process/selectors";
import UserListCard from "../user-list-card/user-list-card";

function LookForCompanyBoxTemplate(): JSX.Element {
  const [startIndex, setStartIndex] = useState(0);
  const users = useAppSelector(getUsers);
  const navigate = useNavigate();

  return(
    <section className="look-for-company">
          {
            users &&
            <div className="container">
              <div className="look-for-company__wrapper">
                <div className="look-for-company__title-wrapper">
                  <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
                  <button
                    className="btn-flat btn-flat--light look-for-company__button"
                    type="button"
                    onClick={() => navigate(AppRoute.Users)}
                  >
                    <span>Смотреть все</span>
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                  <div className="look-for-company__controls">
                    <button
                      className="btn-icon btn-icon--outlined look-for-company__control"
                      type="button"
                      aria-label="previous"
                      disabled={startIndex === Setting.CompanySliderStep - 1}
                        onClick={() => setStartIndex(startIndex - Setting.CompanySliderStep)}
                    >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-left"></use>
                      </svg>
                    </button>
                    <button
                      className="btn-icon btn-icon--outlined look-for-company__control"
                      type="button"
                      aria-label="next"
                      disabled={
                        startIndex === (Setting.MaxPopularTrainingCount - Setting.CompanyCardPerStep) ||
                        startIndex === (users.entities.length - Setting.CompanyCardPerStep)
                      }
                      onClick={() => setStartIndex(startIndex + Setting.CompanySliderStep)}
                    >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-right"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <ul className="look-for-company__list">
                  {
                    users?.entities &&
                    users?.entities
                    .slice(startIndex, startIndex + Setting.CompanyCardPerStep)
                    .map((user) => (
                      <li className="look-for-company__item" key={`company-${user.id}`}>
                        <UserListCard user={user}  />
                      </li>
                    ))
                  }
                  {
                    users.entities.length === 0
                    && <EmptyListCard />
                  }
                </ul>
              </div>
            </div>
          }
    </section>
  );
}

const LookForCompanyBox = memo(LookForCompanyBoxTemplate);

export default LookForCompanyBox;
