import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
import App from './app/layout/App';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import {createBrowserHistory} from 'history';
import { StoreProvider } from './app/context/StoreContext';
//import { configureStore } from './app/store/configureStore';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
//import reportWebVitals from './reportWebVitals';

//const store = configureStore();


export const history = createBrowserHistory({ window });
//export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <HistoryRouter history={history}  >
      <StoreProvider>
        <Provider store={store}>
          <App />
        </Provider>
         
      </StoreProvider>
    </HistoryRouter>
      
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
