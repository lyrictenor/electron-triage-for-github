import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Debug extends Component {
  render() {
    return (
      <div>Debug, <Link to={'/settings'}>settings</Link>, <Link to={'/home'}>home</Link></div>
    );
  }
}
