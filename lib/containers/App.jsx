import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
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

function mapStateToProps (state) {
  return {
    router: state.router,
    setting: Object.assign(
      {},
      state.setting,
      {
        token: decryptData(state.setting.token)
      }
    )
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...settingActionCreators }, dispatch);
}

@withMaterialUI
export default class App extends Component {
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={history}>
            <Route component={reduxRouteComponent(store)} path='/'>
              <Route path={urlTable['home']} component={connect(mapStateToProps, mapDispatchToProps)(Home)} />
              <Route path={urlTable['settings']} component={connect(mapStateToProps, mapDispatchToProps)(Settings)} />
              <Route path={urlTable['debug']} component={connect(mapStateToProps, mapDispatchToProps)(Debug)} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
