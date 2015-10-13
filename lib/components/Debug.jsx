import React, { Component } from 'react';
import { Link } from 'react-router';
import resetStorage from 'reset-storage';
import urls from '../utils/urls';
import {
  RaisedButton,
  Card,
  CardTitle,
  CardText,
  CardActions,
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
        <Card>
          <CardTitle
            title="Reset Storage"
            style={{
              margin: '0 0.4rem',
            }}
            />
          <CardText
            style={{
              margin: '0 0.4rem',
            }}
            >
            Reset IndexedDb <i>{actualDatabaseName}</i>.
            Reset localStorage.
          </CardText>
          <CardActions
            style={{
              margin: '0 0.4rem',
            }}
            >
            <RaisedButton
              onClick={this.handleResetStorage}
              label={'reset storage'}
              />
          </CardActions>
        </Card>
        <div
          style={{
            margin: '2rem 1.4rem',
          }}
          >
          <Link to={urls.get('settings')}>settings</Link>, <Link to={urls.get('home')}>home</Link>
        </div>
      </div>
    );
  }
}
