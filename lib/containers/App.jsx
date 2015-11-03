/* global __DEVELOPMENT__, __DEVTOOLS__ */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { reducer as formReducer } from 'redux-form';

import Home from '../components/Home.jsx';
import Debug from '../components/Debug.jsx';
import SettingPage from '../components/SettingPage.jsx';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import * as reducers from '../reducers';

import urlTable from './urlTable';
import withMaterialUI from '../decorators/withMaterialUI';
import {
  initApplicationConfig,
} from '../utils/configs';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

let DevTools;
if (__DEVTOOLS__) {
  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="H"
                 changePositionKey="Q">
      <LogMonitor />
    </DockMonitor>
  );
}

let finalCreateStore;
const middleware = [thunk, batchedUpdatesMiddleware];
if (__DEVELOPMENT__ && __DEVTOOLS__) {
  const { persistState } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);
}

const reducer = combineReducers({
  form: formReducer,
  ...reducers,
});

const store = finalCreateStore(reducer);

export class App extends Component {
  constructor() {
    super();
    initApplicationConfig();
  }
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    if (__DEVTOOLS__) {
      return (
        <Provider store={store}>
          <div>
            <Router>
              <Route
                path={urlTable.home}
                component={Home}
                />
              <Route
                path={urlTable.debug}
                component={Debug}
                />
              <Route
                path={urlTable.settings}
                component={SettingPage}
                />
            </Router>
            <DevTools />
          </div>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <Router>
          <Route
            path={urlTable.home}
            component={Home}
            />
          <Route
            path={urlTable.debug}
            component={Debug}
            />
          <Route
            path={urlTable.settings}
            component={SettingPage}
            />
        </Router>
      </Provider>
    );
  }
}

App = withMaterialUI(App);

export default App;
