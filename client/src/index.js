import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers/root';
import thunk from 'redux-thunk';
import './index.css';

const store = createStore(
    rootReducer, applyMiddleware(thunk)
);

render(
    <React.StrictMode>
        <Provider store={ store }>
            <div id="appContainer">
                <App/>
            </div>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
