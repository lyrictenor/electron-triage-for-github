import React, { Component, PropTypes } from 'react';
import {
  AppBar,
  LeftNav,
} from 'material-ui';

export default class Header extends Component {
  handleToggleNav(event) {
    event.preventDefault();
    this.refs.leftNav.toggle();
  }

  render() {
    const { title } = this.props;
    // FIXME: selectedIndex
    const menuItems = [
      { route: 'home', text: 'Home' },
      { route: 'settings', text: 'Settings' },
      { route: 'debug', text: 'Debug' },
    ];

    return (
      <div>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={this.handleToggleNav.bind(this)}
          />
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems}
          />
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
