import { Link } from "react-router-dom";
import { AppRoute } from "../../consts";
import './page-404.style.css';

function Page404(): JSX.Element {
  return(
    <div className='not-found-container'>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link className='back-btn' to={AppRoute.Main}>Вернуться на главную</Link>
    </div>
  )
}

export default Page404;
