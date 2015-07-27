import React, { Component, PropTypes } from 'react';

export default class Root extends Component {
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
