import { memo, useEffect, useState } from "react";
import { AppRoute, LOCATIONS, Role, Setting, SortBy, SortDirection, TRAIN_TYPES, UserLevel } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { changeUserQuery } from "../../store/user-process/user-process";
import { uploadUsers } from "../../store/user-process/thunk-actions";


function UserFilterBoxTemplate(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [typeCount, setTypeCount] = useState<number>(Setting.UserFilterIntitalCount)
  const [locationCount, setLocationCount] = useState<number>(Setting.UserFilterIntitalCount)

  const [locations, setLocations] = useState<string[]>([]);
  const [trainTypes, setTrainTypes] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('');
  const [role, setRole] = useState<string>('');


  const typeChangeHandler = (type: string) => {
    if (trainTypes.includes(type)) {
      setTrainTypes(trainTypes.filter((item) => item !== type ))
    } else {
      setTrainTypes([...trainTypes, type])
    }
  }

  const locationChangeHandler = (location: string) => {
    if (locations.includes(location)) {
      setLocations(locations.filter((item) => item !== location ))
    } else {
      setLocations([...locations, location])
    }
  }

  useEffect(() => {
    dispatch(changeUserQuery({
      sortBy: (role) ? SortBy.ROLE : Setting.DefaultSortBy,
      sortDirection: (role === Role.COACH) ? SortDirection.ASC: SortDirection.DESC,
      locations: (locations.length > 0) ? locations : LOCATIONS,
      type: (trainTypes.length > 0) ? trainTypes : TRAIN_TYPES,
      level: level
    })),
    dispatch(
      uploadUsers({
        count: Setting.MaxUserCatalogCount,
        sortBy: (role) ? SortBy.ROLE : Setting.DefaultSortBy,
        locations: (locations.length > 0) ? locations : LOCATIONS,
        type: (trainTypes.length > 0) ? trainTypes : TRAIN_TYPES,
        level: level,
        sortDirection: (role === Role.COACH) ? SortDirection.ASC: SortDirection.DESC,
        page: Setting.DefaultStartPage
      })
    );
  }, [locations, trainTypes, role, level])

  return(
    <div className="user-catalog-form__wrapper">
            <button
              className="btn-flat btn-flat--underlined user-catalog-form__btnback"
              type="button"
              onClick={() => navigate(AppRoute.Main)}
            >
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-left" />
              </svg>
              <span>Назад</span>
            </button>
            <h3 className="user-catalog-form__title">Фильтры</h3>
            <form className="user-catalog-form__form">
              <div className="user-catalog-form__block user-catalog-form__block--location">
                <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                <ul className="user-catalog-form__check-list">
                  {
                    LOCATIONS
                      .map((location,index) => (
                        <li
                          className="user-catalog-form__check-list-item"
                          key={`location-${index}-${location}`}
                          hidden={index >= locationCount}
                        >
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultValue={location}
                                name="location"
                                onChange={() => locationChangeHandler(location)}
                              />
                              <span className="custom-toggle__icon">
                                <svg width={9} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-check" />
                                </svg>
                              </span>
                              <span className="custom-toggle__label">{location}</span>
                            </label>
                          </div>
                        </li>
                      ))
                  }
                </ul>
                {
                  locationCount <= Setting.UserFilterIntitalCount &&
                  <button
                    className="btn-show-more user-catalog-form__btn-show"
                    type="button"
                    onClick={() => setLocationCount(LOCATIONS.length)}
                  >
                    <span>Посмотреть все</span>
                    <svg className="btn-show-more__icon" width={10} height={4} aria-hidden="true">
                      <use xlinkHref="#arrow-down" />
                    </svg>
                  </button>
                }
              </div>
              <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                <h4 className="user-catalog-form__block-title">Специализация</h4>
                <ul className="user-catalog-form__check-list">
                  {
                    TRAIN_TYPES
                      .map((type, index) => (
                        <li
                          className="user-catalog-form__check-list-item"
                          key={`type-${index}-${type}`}
                          hidden={index >= typeCount}
                        >
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultValue={type}
                                name="type"
                                onChange={() => typeChangeHandler(type)}
                              />
                              <span className="custom-toggle__icon">
                                <svg width={9} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-check" />
                                </svg>
                              </span>
                              <span className="custom-toggle__label">{type}</span>
                            </label>
                          </div>
                        </li>
                      ))
                  }
                </ul>
                {
                  typeCount <= Setting.UserFilterIntitalCount &&
                  <button
                    className="btn-show-more user-catalog-form__btn-show"
                    type="button"
                    onClick={() => setTypeCount(TRAIN_TYPES.length)}
                  >
                    <span>Посмотреть все</span>
                    <svg className="btn-show-more__icon" width={10} height={4} aria-hidden="true">
                      <use xlinkHref="#arrow-down" />
                    </svg>
                  </button>
                }
              </div>
              <div className="user-catalog-form__block user-catalog-form__block--level">
                <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                <div className="custom-toggle-radio">
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input
                      type="radio"
                      name="userLevel"
                      defaultValue={UserLevel.NEWBIE}
                      onChange={() => setLevel(UserLevel.NEWBIE)}
                    />
                      <span className="custom-toggle-radio__icon" />
                      <span className="custom-toggle-radio__label">Новичок</span>
                    </label>
                  </div>
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input
                      type="radio"
                      name="userLevel"
                      defaultValue={UserLevel.AMATEUR}
                      onChange={() => setLevel(UserLevel.AMATEUR)}
                    />
                      <span className="custom-toggle-radio__icon" />
                      <span className="custom-toggle-radio__label">Любитель</span>
                    </label>
                  </div>
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input
                      type="radio"
                      name="userLevel"
                      defaultValue={UserLevel.PRO}
                      onChange={() => setLevel(UserLevel.PRO)}
                    />
                      <span className="custom-toggle-radio__icon" />
                      <span className="custom-toggle-radio__label">Профессионал</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="user-catalog-form__block">
                <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                <div className="btn-radio-sort">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      defaultValue={Role.COACH}
                      onChange={() => setRole(Role.COACH)}
                    /><span className="btn-radio-sort__label">Тренеры</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      defaultValue={Role.USER}
                      onChange={() => setRole(Role.USER)}
                    /><span className="btn-radio-sort__label">Пользователи</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
  );
}

const UserFilterBox = memo(UserFilterBoxTemplate);

export default UserFilterBox;
