import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';
// l. 293: Thunk, applyMiddleware, compose.
import { createStore, applyMiddleware, compose, combineReducers  } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

// l.293: Adding Middleware, nu moet je advanced set up gebruiken (1e of 2e hit zoekterm 'redux Devtools' via Google)
// l. 337. Using Environment variables. In production mode de store uitzetten: zie terniry expression hieronder
// In Config --> env.js file zie je dat NODE_ENV = 'development'. Is automatically set. 
// NODE_ENV is accessible via the global variable process (hoef je niet te setten).

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// l.302. Combine reducers.
const rootReducer = combineReducers ({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(
  rootReducer,
  // l. 293: ipv die window.__REDUX(..) enhancer hier als tweede argument,
  // Nu deze syntactische contructie om middleware toe te passen.
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


const app = (
  // l. 265. BrowserRouter should be wrapped within the Provider
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render( app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
