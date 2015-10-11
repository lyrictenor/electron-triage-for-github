import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
// import validateContact from './validateContact';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { filterOutputSettings } from '../utils/settingData';
import {
  RaisedButton,
  TextField,
} from 'material-ui';

function validateSetting(data) {
  const errors = {};
  if (!data.apiendpoint) {
    errors.apiendpoint = 'Api Endpoint is required';
  }
  if (!data.webendpoint) {
    errors.webendpoint = 'Web Endpoint is required';
  }
  if (!data.interval && data.interval !== 0) {// NOTE: This does not work yet
    errors.interval = 'Interval is required';
  } else if (!/\d*/.test(data.interval)) {// NOTE: This does not work yet
    errors.interval = 'Interval requires zero or positive integer';
  }
  return errors;
}

export class SettingForm extends Component {

  render() {
    const {
      fields: { apiendpoint, webendpoint, token, interval },
      handleSubmit,
      setting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          hintText={setting.defaultApiendpoint}
          type={'text'}
          fullWidth
          floatingLabelText={'Api Endpoint'}
          required
          style={{display: 'block'}}
          errorText={apiendpoint.error}
          {...apiendpoint}
          />

        <TextField
          hintText={setting.defaultWebendpoint}
          type={'text'}
          fullWidth
          floatingLabelText={'Web Endpoint'}
          required
          style={{display: 'block'}}
          errorText={webendpoint.error}
          {...webendpoint}
          />

        <TextField
          type={'password'}
          fullWidth
          floatingLabelText={'Token'}
          style={{display: 'block'}}
          errorText={token.error}
          {...token}
          />

        <div>
          <a
            href={setting.tokenUrl}
            onClick={electronOpenLinkInBrowser.bind(this)}
            >
            Get AccessToken
          </a>.
        </div>

        <TextField
          hintText={setting.defaultInterval}
          type={'text'}
          fullWidth
          floatingLabelText={'Interval'}
          required
          style={{display: 'block'}}
          errorText={interval.error}
          {...interval}
          />

        <RaisedButton
          type={'submit'}
          label={'Save'}
          primary
          style={{margin: '48px 0 32px'}}
          />
      </form>
    );
  }
}

SettingForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setting: PropTypes.object.isRequired,
};

SettingForm = reduxForm({
  form: 'setting',
  fields: ['apiendpoint', 'webendpoint', 'token', 'interval'],
  validate: validateSetting,            // a synchronous validation function
})(SettingForm);

function mapStateToProps(state) {
  return {
    form: state.form,
    setting: filterOutputSettings(state.setting),
  };
}

export default connect(mapStateToProps)(SettingForm);
