import React, { Component } from 'react';
import Root from './Root.jsx';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import Home from '../components/Home.jsx';
import Settings from '../components/Settings.jsx';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends Component {
  // NOTE: [1.0.0-beta3] Nested Route with path="/" being matched, but this.props.children is undefined
  // github.com/rackt/react-router/issues/1570
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={history}>
            <Route path='/' component={Root}>
              <Route path='home' component={Home} />
              <Route path='settings' component={Settings} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
