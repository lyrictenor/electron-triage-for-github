/* global __DEVELOPMENT__, __DEVTOOLS__ */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerStateReducer } from 'redux-react-router';

import * as reducers from '../reducers';

let finalCreateStore;
if (__DEVELOPMENT__  && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(thunk)
  )(createStore);
}

const reducer = combineReducers({
  router: routerStateReducer,
  ...reducers,
});

export default function(initialState) {
  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducers = { default: require('../reducers')};
      store.replaceReducer(combineReducers({
        router: routerStateReducer,
        ...nextReducers,
      }));
    });
  }

  return store;
}
