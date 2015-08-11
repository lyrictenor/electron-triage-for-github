import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerStateReducer } from 'redux-react-router';

import * as reducers from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  createStore
);

const reducer = combineReducers({
  router: routerStateReducer,
  ...reducers
});

export default function (initialState) {
  return finalCreateStore(reducer, initialState);
}