import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { checkAuthorization } from "../../store/user-process/thunk-actions";
import './error-screen.style.css';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="error-screen">
      <h1>Error</h1>
      <p>Не удалось получить ответ от сервера</p>
      <button
        type="button"
        onClick={() => {
          dispatch(checkAuthorization());
        }}
      >
        Попробовать ещё раз
      </button>
    </div>
  );
}

export default ErrorScreen;
