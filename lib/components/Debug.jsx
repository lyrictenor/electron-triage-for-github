import React, { Component } from 'react';
import { Link } from 'react-router';
import resetStorage from 'reset-storage';
import urls from '../utils/urls';
import {
  RaisedButton,
  Paper,
} from 'material-ui';
import { databaseName } from '../../package.json';
const actualDatabaseName = `IDBWrapper-${databaseName}`;
import Header from './Header.jsx';

export default class Debug extends Component {
  handleResetStorage() {
    resetStorage(actualDatabaseName).then(() => {
      console.log(`Reset localStorage and indexedDB: ${actualDatabaseName}`);// eslint-disable-line no-console
      window.location.reload();
    });
  }
  render() {
    return (
      <div>
        <Header
          title={'Debug'}
          />
        <Paper
          zDepth={1}
          >
          <RaisedButton
            onClick={this.handleResetStorage}
            label={'reset storage'}
            style={{margin: '32px 0'}}
            />
        </Paper>
        <Link to={urls.get('settings')}>settings</Link>, <Link to={urls.get('home')}>home</Link>
      </div>
    );
  }
}
