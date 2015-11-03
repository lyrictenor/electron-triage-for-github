import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import resetStorage from 'reset-storage';
import {
  RaisedButton,
  Card,
  CardTitle,
  CardText,
  CardActions,
} from 'material-ui';
import databaseName from '../utils/database-name-wrapper';
const actualDatabaseName = `IDBWrapper-${databaseName}`;
import Header from './Header.jsx';
import {
  forceUnlockAutopiloting,
} from '../actions/settingActionCreators';

export class Debug extends Component {
  handleResetStorage() {
    resetStorage(actualDatabaseName).then(() => {
      console.log(`Reset localStorage and indexedDB: ${actualDatabaseName}`);// eslint-disable-line no-console
      window.location.reload();
    });
  }
  handleForceUnlockAutopiloting() {
    this.props.forceUnlockAutopiloting();
    console.log('Force unlock autopiloting.');// eslint-disable-line no-console
    window.location.reload();
  }

  render() {
    const { appGlobal } = this.props;
    return (
      <div>
        <Header
          title={'Debug'}
          />
        <Card>
          <CardTitle
            title="Reset storage"
            style={{
              margin: '0 0.4rem',
            }}
            />
          <CardText
            style={{
              margin: '0 0.4rem',
            }}
            >
            Reset indexedDb <i>{actualDatabaseName}</i>.<br />
            Reset localStorage.
          </CardText>
          <CardActions
            style={{
              margin: '0 0.4rem',
            }}
            >
            <RaisedButton
              onClick={this.handleResetStorage}
              label={'reset'}
              />
          </CardActions>
        </Card>
        <Card>
          <CardTitle
            title="Force unlock autopiloting"
            style={{
              margin: '0 0.4rem',
            }}
            />
          <CardText
            style={{
              margin: '0 0.4rem',
            }}
            >
            LockState: {appGlobal.get('autopiloting') ? 'locked' : 'free' }
          </CardText>
          <CardActions
            style={{
              margin: '0 0.4rem',
            }}
            >
            <RaisedButton
              onClick={this.handleForceUnlockAutopiloting.bind(this)}
              label={'unlock'}
              />
          </CardActions>
        </Card>
      </div>
    );
  }
}

Debug.propTypes = {
  forceUnlockAutopiloting: PropTypes.func.isRequired,
  appGlobal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    appGlobal: state.appGlobal,
  };
}

export default connect(
  mapStateToProps,
  {
    forceUnlockAutopiloting,
  }
)(Debug);
