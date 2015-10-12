import React, { Component, PropTypes } from 'react';
import {
  AppBar,
} from 'material-ui';

export default class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <AppBar
        title={title}
        />
    );
  }
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
