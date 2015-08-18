import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import { reduxRouteComponent } from 'redux-react-router';

import Home from '../components/Home.jsx';
import Settings from '../components/Settings.jsx';
import createStore from '../store/createStore';
import Debug from '../components/Debug.jsx';
import urlTable from './urlTable';
import App from './App.jsx';

const store = createStore();
const RouteComponent = reduxRouteComponent(store);

export default class Root extends Component {
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={history}>
            <Route component={RouteComponent}>
              <Route path='/' component={App}>
                <Route path={urlTable['home']} component={Home} />
                <Route path={urlTable['settings']} component={Settings} />
                <Route path={urlTable['debug']} component={Debug} />
              </Route>
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
