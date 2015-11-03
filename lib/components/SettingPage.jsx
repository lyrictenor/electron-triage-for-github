import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SettingForm from './SettingForm.jsx';
import { Link } from 'react-router';
import urls from '../utils/urls';
import {
  saveSettings,
  initSettings,
} from '../actions/settingActionCreators';
import Header from './Header.jsx';

export class SettingPage extends Component {
  componentWillMount() {
    this.loadData();
  }

  loadData() {
    this.props.initSettings();
  }

  handleSubmit(data) {
    this.props.saveSettings(data);
  }

  render() {
    return (
      <div>
        <Header
          title={'Settings'}
          />
        <SettingForm onSubmit={this.handleSubmit.bind(this)}/>
        <div
          style={{
            margin: '2rem 1.4rem',
          }}
          >
          <Link to={urls.get('home')}>home</Link>, <Link to={urls.get('debug')}>debug</Link>
        </div>
      </div>
    );
  }
}

SettingPage.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  initSettings: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(
  mapStateToProps,
  {
    saveSettings,
    initSettings,
  }
)(SettingPage);  // adds dispatch prop
