import { Navigate } from "react-router-dom";
import { AppRoute, Role } from "../../consts";
import { useAppSelector } from "../../hooks/use-app-dispatch"
import { getUserInfo } from "../../store/user-process/selectors"
import QuestionnaireCoach from "./questionnaire-coach";
import QuestionnaireUser from "./questionnaire-user";

function Questionnaire() {
  const user = useAppSelector(getUserInfo);

  if (!user) {
    return <Navigate to={AppRoute.Intro} />
  }

  return (user.role === Role.COACH) ? <QuestionnaireCoach /> : <QuestionnaireUser />
}

export default Questionnaire;
