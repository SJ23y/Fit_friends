import { useEffect } from "react";
import FeaturedTrainingsBox from "../../components/featured-trainings-box/featured-trainings-box";
import PopularTrainingsBox from "../../components/popular-trainings-box/popular-trainings-box";
import SpecialTrainingsBox from "../../components/special-trainings-box/special-trainings-box";
import { uploadFeaturedTrainings, uploadPopularTrainings, uploadSpecialTrainings } from "../../store/main-process/thunk-actions";
import { AppRoute, FilterBy, Role, Setting, SortBy, SortDirection } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getUserInfo } from "../../store/user-process/selectors";
import { useNavigate } from "react-router-dom";
import { uploadUsers } from "../../store/user-process/thunk-actions";
import LookForCompanyBox from "../../components/look-for-company-box/look-for-company-box";

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUserInfo);

  useEffect(() => {
    if (user?.role === Role.COACH) {
      navigate(AppRoute.Account)
    } else {
    dispatch(
      uploadPopularTrainings({
        page: Setting.DefaultStartPage,
        count: Setting.MaxPopularTrainingCount,
        sortBy: SortBy.POPULAR,
        sortDirection: SortDirection.DESC
    }));
    dispatch(
      uploadFeaturedTrainings({
        page: Setting.DefaultStartPage,
        count: Setting.MaxFeaturedTrainingCount,
        filterBy: FilterBy.USER,
        sortBy: Setting.DefaultSortBy,
        sortDirection: Setting.DefaultSortDirection
    }));
    dispatch(
      uploadSpecialTrainings({
        page: Setting.DefaultStartPage,
        count: Setting.MaxSpecialTrainingCount,
        filterBy: FilterBy.SPECIAL
    }));
    dispatch(
      uploadUsers({
        page: Setting.DefaultStartPage,
        count: Setting.MaxLookForCompanyCount
    }));
  }
  }, [])

  return(

      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <FeaturedTrainingsBox />
        <SpecialTrainingsBox />
        <PopularTrainingsBox />
        <LookForCompanyBox />
      </main>
  )
}

export default Main;
