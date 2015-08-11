import React, { Component } from 'react';
import { Link } from 'react-router';
import resetStorage from 'reset-storage';
import { databaseName } from '../../package.json';

import Crossing from 'crossing';
import urlTable from '../containers/urlTable';
const urls = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
urls.load(urlTable);

export default class Debug extends Component {
  handleResetStorage () {
    resetStorage(databaseName).then(() => {
      console.log(`Reset localStorage and indexedDB: ${databaseName}`);//eslint-disable-line no-console
    });
  }
  render() {
    return (
      <div>
        Debug, <Link to={urls.get('settings')}>settings</Link>, <Link to={urls.get('home')}>home</Link>
        <button onClick={this.handleResetStorage}>Reset storage</button>
      </div>
    );
  }
}
