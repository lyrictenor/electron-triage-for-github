import React, { Component, PropTypes } from 'react';
import {
  AppBar,
  LeftNav,
} from 'material-ui';
import urls from '../utils/urls';
import { transitionTo } from 'redux-react-router';
import { connect } from 'react-redux';

export class Header extends Component {
  handleToggleNav(event) {
    event.preventDefault();
    this.refs.leftNav.toggle();
  }
  handleSelectNav(event, key, payload) {
    console.log(payload);// eslint-disable-line no-console
    this.props.dispatch(transitionTo(payload.route));
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
          onChange={this.handleSelectNav.bind(this)}
          />
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Header);
