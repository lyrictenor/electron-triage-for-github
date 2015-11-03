import './browser/index';
import '../assets/application.css';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

/*
 Needed for onTouchTap
 Can go away when react 1.0 release
 Check this repo:
 https://github.com/zilverline/react-tap-event-plugin
 */
injectTapEventPlugin();

import App from './containers/App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
