import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';// eslint-disable-line no-unused-vars
// github.com/babel/babel-eslint/issues/72
// Using decorator doesn't count as usage by eslint

@connect(state => ({
  router: state.router,
  setting: state.setting
}))
class Root extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

// github.com/yannickcr/eslint-plugin-react/issues/7
Root.propTypes = {
  children: PropTypes.node.isRequired
};

export default Root;
