import { memo, useEffect, useState } from "react";
import { AppRoute, Setting, TrainDuration } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getQuery } from "../../store/main-process/selectors";
import { changeQuery } from "../../store/main-process/main-process";
import CustomSlider from "../custom-slider/custom-slider";

type TrainingFilterBoxCoachProps = {
  maxPrice: number;
  minPrice: number;
  minCallories: number;
  maxCallories: number;
}

function TrainingFilterBoxCoachTemplate({ maxPrice, minPrice, maxCallories, minCallories}: TrainingFilterBoxCoachProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(getQuery)
  const [priceRange, setPriceRange] = useState({maxPrice, minPrice});
  const [calloriesRange, setCalloriesRange] = useState({maxCallories, minCallories});
  const [durations, setDuration] = useState<TrainDuration[]>(Object.values(TrainDuration));
  const [ratingRange, setRatingRange] = useState<{minRating: number, maxRating: number}>({minRating: 0, maxRating: Setting.MaxRating});


  const lostFocusPriceInputHandler = (evt: React.FormEvent) => {
    const {name, value} = evt.target as HTMLInputElement;
    const calloriesValue = parseInt(value, 10);
    let newValue = calloriesValue;
    if (name === 'minPrice') {
      newValue = (calloriesValue < minPrice) ? minPrice : (calloriesValue > priceRange.maxPrice) ? priceRange.maxPrice : calloriesValue;
    }
    if (name === 'maxPrice') {
      newValue = (calloriesValue > maxPrice) ? maxPrice : (calloriesValue < priceRange.minPrice) ? priceRange.minPrice : calloriesValue;
    }
    setPriceRange({...priceRange, [name]: newValue});
  }

  const changePriceInputHandler = (evt: React.FormEvent) => {
    const element = evt.target as HTMLInputElement;
    const value = parseInt(element.value, 10);

    setPriceRange({...priceRange, [element.name]: value});
  }

  const changePriceSliderHandler = (_evt: Event, newValue: number | number[]) => {
    const [minPrice, maxPrice] = newValue as number[];
    setPriceRange({...priceRange, minPrice, maxPrice})
  }

  const lostFocusCalloriesInputHandler = (evt: React.FormEvent) => {
    const {name, value} = evt.target as HTMLInputElement;
    const calloriesValue = parseInt(value, 10);
    let newValue = calloriesValue;
    if (name === 'minCallories') {
      newValue = (calloriesValue < minCallories) ? minCallories : (calloriesValue > calloriesRange.maxCallories) ? calloriesRange.maxCallories : calloriesValue;
    }
    if (name === 'maxCallories') {
      newValue = (calloriesValue > maxCallories) ? maxCallories : (calloriesValue < calloriesRange.minCallories) ? calloriesRange.minCallories : calloriesValue;
    }
    setCalloriesRange({...calloriesRange, [name]: newValue});
  }

  const changeCalloriesInputHandler = (evt: React.FormEvent) => {
    const element = evt.target as HTMLInputElement;
    const value = parseInt(element.value, 10)
    setCalloriesRange({...calloriesRange, [element.name]: value});
  }

  const changeCalloriesSliderHandler = (_evt: Event, newValue: number | number[]) => {
    const [minCallories, maxCallories] = newValue as number[];
    setCalloriesRange({minCallories, maxCallories})
  }

  const changeRatingSliderHandler = (_evt: Event, newValue: number | number[]) => {
    const [minRating, maxRating] = newValue as number[];
    setRatingRange({minRating, maxRating})
  }

  const durationChangeHandler = (value: TrainDuration) => {
    if (durations.includes(value)) {
      setDuration(durations.filter(duration => duration !== value));
    } else {
      setDuration([...durations, value])
    }
  }

  useEffect(() => {
    dispatch(changeQuery({
      ...query,
      page: Setting.DefaultStartPage,
      maxPrice: priceRange.maxPrice,
      minPrice: priceRange.minPrice,
      maxCallories: calloriesRange.maxCallories,
      minCallories: calloriesRange.minCallories,
      maxRating: ratingRange.maxRating,
      minRating: ratingRange.minRating,
      durations: durations
    }))
  }, [priceRange, calloriesRange, ratingRange, durations])

  return(
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <button
                    className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                    type="button"
                    onClick={() => navigate(AppRoute.Account)}
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </button>
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form">
          <div className="gym-catalog-form__block gym-catalog-form__block--price">
            <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
              <div className="filter-price">
                <div className="filter-price__input-text filter-price__input-text--min">
                  <input
                    type="number"
                    id="text-min"
                    name="minPrice"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange.minPrice}
                    onChange={changePriceInputHandler}
                    onBlur={lostFocusPriceInputHandler}
                  />
                  <label htmlFor="text-min">от</label>
                </div>
                <div className="filter-price__input-text filter-price__input-text--max">
                  <input
                    type="number"
                    id="text-max"
                    min={minPrice}
                    max={maxPrice}
                    name="maxPrice"
                    value={priceRange.maxPrice}
                    onChange={changePriceInputHandler}
                    onBlur={lostFocusPriceInputHandler}
                  />
                  <label htmlFor="text-max">до</label>
                </div>
              </div>
              <div className="filter-range">
                  <CustomSlider
                    ariaLabel='Price range'
                    max={maxPrice}
                    min={minPrice}
                    value={[priceRange.minPrice, priceRange.maxPrice]}
                    onChange={changePriceSliderHandler}
                    valueLabelDisplay="auto"
                  />
              </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--calories">
            <h4 className="gym-catalog-form__block-title">Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input
                  type="number"
                  id="text-min-cal"
                  min={minCallories}
                  max={maxCallories}
                  name="minCallories"
                  value={calloriesRange.minCallories}
                  onChange={changeCalloriesInputHandler}
                  onBlur={lostFocusCalloriesInputHandler}
                />
                <label htmlFor="text-min-cal">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input
                  type="number"
                  id="text-max-cal"
                  min={minCallories}
                  max={maxCallories}
                  name="maxCallories"
                  value={calloriesRange.maxCallories}
                  onChange={changeCalloriesInputHandler}
                  onBlur={lostFocusCalloriesInputHandler}
                />
                <label htmlFor="text-max-cal">до</label>
              </div>
            </div>
            <div className="filter-range">
                <CustomSlider
                  ariaLabel='Callories range'
                  max={maxCallories}
                  min={minCallories}
                  value={[calloriesRange.minCallories, calloriesRange.maxCallories]}
                  onChange={changeCalloriesSliderHandler}
                  valueLabelDisplay="auto"
                />
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
                  <CustomSlider
                    ariaLabel='Rating range'
                    max={Setting.MaxRating}
                    min={0}
                    value={[ratingRange.minRating, ratingRange.maxRating]}
                    onChange={changeRatingSliderHandler}
                    valueLabelDisplay="on"
                  />
            </div>
          </div>
          <div className="my-training-form__block my-training-form__block--duration">
            <h4 className="my-training-form__block-title">Длительность</h4>
            <ul className="my-training-form__check-list">
              {
                Object.values(TrainDuration).map((trainDuration, index) => (
                  <li className="my-training-form__check-list-item" key={`duration-${trainDuration}-${index}`}>
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={trainDuration}
                          name="duration"
                          checked={durations.includes(trainDuration)}
                          onChange={() => durationChangeHandler(trainDuration)}
                          disabled={durations.length === 1 && durations.includes(trainDuration)}
                        />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">{trainDuration}</span>
                      </label>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}

const TrainingFilterBoxCoach = memo(TrainingFilterBoxCoachTemplate);

export default TrainingFilterBoxCoach;
