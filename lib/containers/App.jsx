/* global __DEVTOOLS__ */
import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { reduxRouteComponent } from 'redux-react-router';

import Home from '../components/Home.jsx';
import Settings from '../components/Settings.jsx';
import createStore from '../store/createStore';
import Debug from '../components/Debug.jsx';
import { bindActionCreators } from 'redux';
import * as settingActionCreators from '../actions/settingActionCreators';
import urlTable from './urlTable';
import { decryptData } from '../utils/cryptData';
import withMaterialUI from '../decorators/withMaterialUI';

const store = createStore();

function mapStateToProps(state) {
  return {
    router: state.router,
    setting: Object.assign(
      {},
      state.setting,
      {
        token: decryptData(state.setting.token),
        interval: String(state.setting.interval),
        defaultInterval: String(state.setting.defaultInterval),
      }
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...settingActionCreators,
  }, dispatch);
}

@withMaterialUI
export default class App extends Component {
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    const { history } = this.props;
    const elements = [
      (
      <Provider store={store}>
        {() =>
          <Router history={history}>
            <Route component={reduxRouteComponent(store)} path="/">
              <Route path={urlTable.home} component={connect(mapStateToProps, mapDispatchToProps)(Home)} />
              <Route path={urlTable.settings} component={connect(mapStateToProps, mapDispatchToProps)(Settings)} />
              <Route path={urlTable.debug} component={connect(mapStateToProps, mapDispatchToProps)(Debug)} />
            </Route>
          </Router>
        }
      </Provider>
      ),
    ];
    if (__DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      elements.push(
        <DebugPanel top right bottom key="debugPanel">
          <DevTools store={store} monitor={LogMonitor}/>
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
