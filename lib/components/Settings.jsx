import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { Link } from 'react-router';
import { RaisedButton, Paper } from 'material-ui';
import {
  saveSettings,
} from '../actions/settingActionCreators';
import FormInput from './ui/FormInput.jsx';
import urls from '../utils/urls';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { decryptData } from '../utils/cryptData';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { canSubmit: false };
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }
  submit(model) {
    this.props.saveSettings(model);
  }

  render() {
    const submitText = (this.state.canSubmit) ? 'Save' : 'Invalid';
    const { setting } = this.props;
    return (
      <div>
        <h3>
          Settings
        </h3>
        <Paper
          zDepth={1}
          >
          <Formsy.Form
            onValidSubmit={this.submit.bind(this)}
            onValid={this.enableButton.bind(this)}
            onInvalid={this.disableButton.bind(this)}
            className={'settings'}
            >
            <FormInput
              name={'apiendpoint'}
              placeholder={setting.defaultApiendpoint}
              validationError={'Api Endpoint is required'}
              value={setting.apiendpoint}
              style={{display: 'block'}}
              fullWidth
              required
              />
            <FormInput
              name={'webendpoint'}
              placeholder={setting.defaultWebendpoint}
              validationError={'Web Endpoint is required'}
              value={setting.webendpoint}
              style={{display: 'block'}}
              fullWidth
              required
              />
            <FormInput
              name={'token'}
              type={'password'}
              value={setting.token}
              style={{display: 'block'}}
              fullWidth
              />
            <div>
              <a
                href={setting.tokenUrl}
                onClick={electronOpenLinkInBrowser.bind(this)}
                >
                Get AccessToken
              </a>.
            </div>
            <FormInput
              name={'interval'}
              placeholder={setting.defaultInterval}
              validationError={'Interval is required'}
              value={setting.interval}
              style={{display: 'block'}}
              fullWidth
              required
              />

            <RaisedButton
              type={'submit'}
              label={submitText}
              primary
              disabled={!this.state.canSubmit}
              style={{margin: '48px 0 32px'}}
              />
          </Formsy.Form>
        </Paper>
        <Link to={urls.get('home')}>home</Link>, <Link to={urls.get('debug')}>debug</Link>
      </div>
    );
  }
}

Settings.propTypes = {
  setting: PropTypes.object.isRequired,
  saveSettings: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    setting: Object.assign(
      {},
      state.setting,
      {
        token: decryptData(state.setting.token),
        interval: String(state.setting.interval),
        defaultInterval: String(state.setting.defaultInterval),
      }
    ),
  };
}

export default connect(
  mapStateToProps,
  {
    saveSettings,
  }
)(Settings);
