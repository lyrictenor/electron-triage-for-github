import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SettingForm from './SettingForm.jsx';
// import { Paper } from 'material-ui';
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
        <Link to={urls.get('home')}>home</Link>, <Link to={urls.get('debug')}>debug</Link>
      </div>
    );
  }
}

SettingPage.propTypes = {
  initSettings: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  {
    initSettings,
    saveSettings,
  }
)(SettingPage);  // adds dispatch prop
