import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import SettingForm from './SettingForm.jsx';

export class SettingPage extends Component {
  handleSubmit(data) {
    console.log('Submission received!', data);// eslint-disable-line no-console
    this.props.dispatch(initialize('setting', {})); // clear form
  }

  render() {
    return (
      <div>
        <h1>Contact Information</h1>

        <SettingForm onSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

SettingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SettingPage);  // adds dispatch prop
