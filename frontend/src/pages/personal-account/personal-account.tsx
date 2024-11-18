import CoachAccountContent from "../../components/account-content/coach-account-content";
import UserAccountContent from "../../components/account-content/user-account-content";
import UserInfoSection from "../../components/user-info-section/user-info-section";
import { Role } from "../../consts";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { getUserInfo } from "../../store/user-process/selectors";


function PersonalAccount(): JSX.Element {
  const user = useAppSelector(getUserInfo);

  return(
      <main>
        {
          user &&
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Личный кабинет</h1>
                <UserInfoSection user={user} />
                { user.role === Role.USER ? <UserAccountContent user={user} /> : <CoachAccountContent  />}
              </div>
            </div>
          </section>
        }
      </main>
  )
}


export default PersonalAccount;
