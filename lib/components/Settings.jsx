import React, { Component, PropTypes } from 'react';
import Formsy from 'formsy-react';
import { Link } from 'react-router';

import FormInput from './ui/FormInput.jsx';
import enableHtmlTag from '../utils/enableHtmlTag';

class Settings extends Component {
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
  submit (model) {
    this.props.actions.saveSettings(model);
  }

  render() {
    const submitText = (this.state.canSubmit) ? 'Save' : 'Invalid';
    const { setting } = this.props;
    return (
      <Formsy.Form
        onValidSubmit={this.submit.bind(this)}
        onValid={this.enableButton.bind(this)}
        onInvalid={this.disableButton.bind(this)}
        className='settings'
        >
        <FormInput
          name='apiendpoint'
          placeholder={setting.defaultApiendpoint}
          validationError='Api Endpoint is required'
          value={setting.apiendpoint}
          required
          />
        <FormInput
          name='webendpoint'
          placeholder={setting.defaultWebendpoint}
          validationError='Web Endpoint is required'
          value={setting.webendpoint}
          required
          />
        <FormInput
          name='token'
          type='password'
          value={setting.token}
          />
        <a
          href={setting.tokenUrl}
          >
          Get AccessToken
        </a>.
        <button
          type='submit'
          {...enableHtmlTag(this.state.canSubmit)}
          >
          {submitText}
        </button>

        <Link to={'/home'}>home</Link>, <Link to={'/debug'}>debug</Link>
      </Formsy.Form>
    );
  }
}

Settings.propTypes = {
  setting: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Settings;
