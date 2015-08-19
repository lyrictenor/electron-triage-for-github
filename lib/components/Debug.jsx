import React, { Component } from 'react';
import { Link } from 'react-router';
import resetStorage from 'reset-storage';
import { databaseName } from '../../package.json';
import urls from '../utils/urls';
import { FlatButton } from 'material-ui';

export default class Debug extends Component {
  handleResetStorage () {
    resetStorage(databaseName).then(() => {
      console.log(`Reset localStorage and indexedDB: ${databaseName}`);//eslint-disable-line no-console
      window.location.reload();
    });
  }
  render() {
    return (
      <div>
        Debug, <Link to={urls.get('settings')}>settings</Link>, <Link to={urls.get('home')}>home</Link>
        <FlatButton onClick={this.handleResetStorage} label={'reset storage'} primary={true} />
      </div>
    );
  }
}
