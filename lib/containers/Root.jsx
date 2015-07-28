import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';// eslint-disable-line no-unused-vars
// github.com/babel/babel-eslint/issues/72
// Using decorator doesn't count as usage by eslint
import { bindActionCreators } from 'redux';
import * as settingActionCreators from '../actions/settingActionCreators';

@connect(state => ({
  router: state.router,
  setting: state.setting
}))
class Root extends Component {
  render () {
    const { router, setting, dispatch } = this.props;
    const props = {
      router,
      setting,
      actions: bindActionCreators({ ...settingActionCreators }, dispatch)
    };
    return (
      <div>
        { React.cloneElement(this.props.children, props) }
      </div>
    );
  }
}

// github.com/yannickcr/eslint-plugin-react/issues/7
Root.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  setting: PropTypes.object.isRequired
};

export default Root;
