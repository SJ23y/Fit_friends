import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthorization } from './store/thunk-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthorization());

root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/*<ToastContainer
        autoClose={false}
        position='top-center'
        theme='colored'
       />*/}
      <App />
    </React.StrictMode>
  </Provider>
);
