import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import {
  RaisedButton,
  TextField,
} from 'material-ui';
import buildGithubTokenUrl from '../utils/buildGithubTokenUrl';

function validateSetting(data) {
  const errors = {};
  if (!data.apiEndpoint) {
    errors.apiEndpoint = 'Api Endpoint is required';
  }
  if (!data.webEndpoint) {
    errors.webEndpoint = 'Web Endpoint is required';
  }
  if (!data.autopilotInterval && data.autopilotInterval !== 0) {// NOTE: This does not work yet
    errors.autopilotInterval = 'Autopilot interval is required';
  } else if (!/\d*/.test(data.autopilotInterval)) {// NOTE: This does not work yet
    errors.autopilotInterval = 'Autopilot interval requires zero or positive integer';
  }
  return errors;
}

export class SettingForm extends Component {

  render() {
    const {
      fields: {
        apiEndpoint,
        webEndpoint,
        token,
        autopilotInterval,
        enableAutopilot,
        },
      handleSubmit,
      appGlobal,
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          margin: '1rem 1.4rem',
        }}
        >
        <TextField
          hintText={appGlobal.get('defaultApiEndpoint')}
          type={'text'}
          floatingLabelText={'Api Endpoint'}
          required
          style={{
            minWidth: '20rem',
            display: 'block',
          }}
          errorText={apiEndpoint.error}
          {...apiEndpoint}
          />

        <TextField
          hintText={appGlobal.get('defaultWebEndpoint')}
          type={'text'}
          floatingLabelText={'Web Endpoint'}
          required
          style={{
            minWidth: '20rem',
            display: 'block',
          }}
          errorText={webEndpoint.error}
          {...webEndpoint}
          />

        <TextField
          type={'password'}
          floatingLabelText={'Personal token'}
          style={{
            minWidth: '20rem',
            display: 'block',
          }}
          errorText={token.error}
          {...token}
          />

        <div
          style={{
            margin: '0.4rem 0 0',
          }}
          >
          <a
            href={appGlobal.get('tokenUrl')}
            onClick={electronOpenLinkInBrowser.bind(this)}
            >
            Get AccessToken
          </a>.
        </div>

        <div
          style={{
            margin: '1.8rem 0 0.8rem',
          }}
          >
          Autopilot
        </div>

        <label htmlFor="enableAutopilot">
          <input type="checkbox" id="enableAutopilot" {...enableAutopilot}/>
          <span
            style={{
              margin: '0 0.4rem 0',
            }}
            >
            Enable autopilot
          </span>
        </label>

        <TextField
          hintText={appGlobal.get('defaultAutopilotInterval')}
          type={'text'}
          floatingLabelText={'Autopilot interval seconds (wip)'}
          required
          style={{
            minWidth: '20rem',
            display: 'block',
          }}
          errorText={autopilotInterval.error}
          {...autopilotInterval}
          disabled={!enableAutopilot.value}
          />

        <RaisedButton
          type={'submit'}
          label={'Save'}
          primary
          style={{
            margin: '2rem 0 0',
          }}
          />
      </form>
    );
  }
}

SettingForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  appGlobal: PropTypes.object.isRequired,
};

SettingForm = reduxForm({
  form: 'setting',
  fields: [
    'apiEndpoint',
    'webEndpoint',
    'token',
    'autopilotInterval',
    'enableAutopilot',
  ],
  validate: validateSetting,
})(SettingForm);

function mapStateToProps(state) {
  const appGlobal = new Map([state.appGlobal]);
  appGlobal.set('tokenUrl', buildGithubTokenUrl(state.appGlobal.get('webEndpoint')));
  return {
    form: state.form,
    appGlobal: appGlobal,
  };
}

export default connect(mapStateToProps)(SettingForm);
