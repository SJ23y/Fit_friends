import './error-screen.style.css';
import { AppRoute } from "../../consts";
import { redirectToRoute } from "../../store/actions";
import { store } from '../../store';

function ErrorScreen(): JSX.Element {

  return (
    <div className="error-screen">
      <h1>Error</h1>
      <p>Не удалось получить ответ от сервера</p>
      <button
        type="button"
        onClick={() => store.dispatch(redirectToRoute(AppRoute.Main))}
      >
        Попробовать ещё раз
      </button>
    </div>
  );
}

export default ErrorScreen;
