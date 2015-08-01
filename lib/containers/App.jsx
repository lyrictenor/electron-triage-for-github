import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import { reduxRouteComponent } from 'redux-react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import Root from './Root.jsx';
import Home from '../components/Home.jsx';
import Settings from '../components/Settings.jsx';
import store from '../utils/store';
import Debug from '../components/Debug.jsx';

let contents = [
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route component={reduxRouteComponent(store)}>
          <Route path='/' component={Root}>
            <Route path='home' component={Home} />
            <Route path='settings' component={Settings} />
            <Route path='debug' component={Debug} />
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
  constructor(props) {
    super(props);
  }
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
