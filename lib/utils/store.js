import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerStateReducer } from 'redux-react-router';
// github.com/gaearon/redux-devtools/blob/a297a3606ad8dee0111ca55548bfa6383d71e4f9/examples/counter/containers/App.js
import { devTools, persistState } from 'redux-devtools';

import * as reducers from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers({
  router: routerStateReducer,
  ...reducers
});
const store = finalCreateStore(reducer);
export default store;
