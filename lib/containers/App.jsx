import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import thunk from 'redux-thunk';
import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';
// github.com/gaearon/redux-devtools/blob/a297a3606ad8dee0111ca55548bfa6383d71e4f9/examples/counter/containers/App.js
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import * as reducers from '../reducers';
import Root from './Root.jsx';
import Home from '../components/Home.jsx';
import Settings from '../components/Settings.jsx';

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

let contents = [
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route component={reduxRouteComponent(store)}>
          <Route path='/' component={Root}>
            <Route path='home' component={Home} />
            <Route path='settings' component={Settings} />
          </Route>
        </Route>
      </Router>
    }
  </Provider>
];

if (process.env.NODE_ENV === 'development') {
  contents.push(
    <DebugPanel top right bottom>
      <DevTools store={store}
                monitor={LogMonitor} />
    </DebugPanel>
  );
}

export default class App extends Component {
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    return (
      <div>
        {contents}
      </div>
    );
  }
}
