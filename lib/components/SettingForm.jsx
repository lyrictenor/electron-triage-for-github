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

function validateContact(data) {
  const errors = {};
  if (!data.apiendpoint) {
    errors.apiendpoint = 'Api Endpoint is required';
  }
  if (!data.webendpoint) {
    errors.webendpoint = 'Web Endpoint is required';
  }
  // if (data.address && data.address.length > 50) {
  //  errors.address = 'Must be fewer than 50 characters';
  // }
  // if (!data.phone) {
  //  errors.phone = 'Required';
  // } else if (!/\d{3}-\d{3}-\d{4}/.test(data.phone)) {
  //  errors.phone = 'Phone must match the form "999-999-9999"';
  // }
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

        <label>Token</label>
        <input type="text" {...token}/>
        {token.error && token.touched && <div>{token.error}</div>}

        <div>
          <a
            href={setting.tokenUrl}
            onClick={electronOpenLinkInBrowser.bind(this)}
            >
            Get AccessToken
          </a>.
        </div>

        <label>Interval</label>
        <input type="text" {...interval}/>
        {interval.error && interval.touched && <div>{interval.error}</div>}

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
  validate: validateContact,            // a synchronous validation function
})(SettingForm);

function mapStateToProps(state) {
  return {
    form: state.form,
    setting: filterOutputSettings(state.setting),
  };
}

export default connect(mapStateToProps)(SettingForm);
