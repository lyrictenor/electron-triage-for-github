import './browser/index';
import '../assets/application.css';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { history } from 'react-router/lib/HashHistory';

/*
 Needed for onTouchTap
 Can go away when react 1.0 release
 Check this repo:
 https://github.com/zilverline/react-tap-event-plugin
 */
injectTapEventPlugin();

import App from './containers/App.jsx';

React.render(
  <App history={history} />,
  document.getElementById('app')
);
