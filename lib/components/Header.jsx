import React, { Component, PropTypes } from 'react';
import {
  AppBar,
  LeftNav,
} from 'material-ui';
import urls from '../utils/urls';

export default class Header extends Component {
  handleToggleNav(event) {
    event.preventDefault();
    this.refs.leftNav.toggle();
  }

  render() {
    const { title } = this.props;
    // FIXME: selectedIndex
    const menuItems = [
      { route: urls.get('home'), text: 'Home' },
      { route: urls.get('settings'), text: 'Settings' },
      { route: urls.get('debug'), text: 'Debug' },
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
