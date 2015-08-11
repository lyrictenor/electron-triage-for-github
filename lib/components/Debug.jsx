import React, { Component } from 'react';
import { Link } from 'react-router';
import resetStorage from 'reset-storage';
import { databaseName } from '../../package.json';
import urls from '../utils/urls';

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
