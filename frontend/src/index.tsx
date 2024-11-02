import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthorization } from './store/thunk-actions';

store.dispatch(checkAuthorization());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


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
