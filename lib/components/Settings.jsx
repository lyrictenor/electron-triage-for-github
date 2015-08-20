import React, { Component, PropTypes } from 'react';
import Formsy from 'formsy-react';
import { Link } from 'react-router';
import { RaisedButton, Paper } from 'material-ui';

import FormInput from './ui/FormInput.jsx';
import urls from '../utils/urls';

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
            className='settings'
            >
            <FormInput
              name='apiendpoint'
              placeholder={setting.defaultApiendpoint}
              validationError='Api Endpoint is required'
              value={setting.apiendpoint}
              style={{display: 'block'}}
              fullWidth={true}
              required
              />
            <FormInput
              name='webendpoint'
              placeholder={setting.defaultWebendpoint}
              validationError='Web Endpoint is required'
              value={setting.webendpoint}
              style={{display: 'block'}}
              fullWidth={true}
              required
              />
            <FormInput
              name='token'
              type='password'
              value={setting.token}
              style={{display: 'block'}}
              fullWidth={true}
              />
            <div>
              <a
                href={setting.tokenUrl}
                >
                Get AccessToken
              </a>.
            </div>

            <RaisedButton
              type={'submit'}
              label={submitText}
              primary={true}
              disabled={!this.state.canSubmit}
              style={{margin: '3rem 0 2rem'}}
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
  doNothing: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired
};

export default Settings;
