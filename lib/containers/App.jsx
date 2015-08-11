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

const store = createStore();

function mapStateToProps (state) {
  return {
    router: state.router,
    setting: state.setting
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...settingActionCreators }, dispatch);
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={history}>
            <Route component={reduxRouteComponent(store)}>
              <Route path='home' component={connect(mapStateToProps, mapDispatchToProps)(Home)} />
              <Route path='settings' component={connect(mapStateToProps, mapDispatchToProps)(Settings)} />
              <Route path='debug' component={connect(mapStateToProps, mapDispatchToProps)(Debug)} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
