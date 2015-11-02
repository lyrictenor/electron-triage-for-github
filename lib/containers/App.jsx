/* global __DEVELOPMENT__, __DEVTOOLS__ */
import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route } from 'react-router';
import {
  reduxRouteComponent,
  routerStateReducer,
} from 'redux-react-router';
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


let finalCreateStore;
const middleware = [thunk, batchedUpdatesMiddleware];
if (__DEVELOPMENT__ && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);
}

const reducer = combineReducers({
  router: routerStateReducer,
  form: formReducer,
  ...reducers,
});

const store = finalCreateStore(reducer);

function mapStateToProps(state) {
  return {
    router: state.router,
    form: state.form,
  };
}

export class App extends Component {
  constructor() {
    super();
    initApplicationConfig();
  }
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    const { history } = this.props;
    const elements = [];
    elements.push(
      <Provider store={store} key="Provider">
        {() =>
          <Router history={history}>
            <Route
              component={reduxRouteComponent(store)}
              path="/"
              >
              <Route
                path={urlTable.home}
                component={connect(mapStateToProps)(Home)}
                />
              <Route
                path={urlTable.debug}
                component={connect(mapStateToProps)(Debug)}
                />
              <Route
                path={urlTable.settings}
                component={connect(mapStateToProps)(SettingPage)}
                />
            </Route>
          </Router>
        }
      </Provider>
    );
    if (__DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      const visible = true;
      elements.push(
        <DebugPanel top right bottom key="debugPanel">
          <DevTools
            store={store}
            monitor={LogMonitor}
            visibleOnLoad={visible}
            />
        </DebugPanel>
      );
    }

    return (
      <div>{elements}</div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

App = withMaterialUI(App);

export default App;
