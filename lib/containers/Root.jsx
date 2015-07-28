import React, { Component, PropTypes } from 'react';

// @connect does not work ;( for passing store data, so use Connector
//import { connect } from 'react-redux';// eslint-disable-line no-unused-vars
// github.com/babel/babel-eslint/issues/72
// Using decorator doesn't count as usage by eslint

import { Connector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActionCreators from '../actions/settingActionCreators';

class Root extends Component {
  constructor(props) {
    super(props);
  }

  renderChild ({router, setting, dispatch}) {
    const props = {
      router,
      setting,
      actions: bindActionCreators({ ...settingActionCreators }, dispatch)
    };
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, props);
    });
    return (
      <div>
        {children}
      </div>
    );
  }
  render () {
    return (
      <Connector select={state => ({ router: state.router, setting: state.setting })}>
        { this.renderChild.bind(this) }
      </Connector>
    );
  }
}

// github.com/yannickcr/eslint-plugin-react/issues/7
Root.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Root;
