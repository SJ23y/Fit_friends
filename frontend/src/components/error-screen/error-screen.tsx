import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
function ErrorScreen(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="error-screen">
      <p>При загрузке сайта произошла ошибка</p>
      <button
        type="button"
        onClick={() => {
          navigate((AppRoute.Login));
        }}
      >
        Попробовать ещё раз
      </button>
    </div>
  );
}

export { ErrorScreen };
