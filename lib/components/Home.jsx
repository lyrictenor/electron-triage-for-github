import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>Home, <Link to={'/settings'}>settings</Link></div>
    );
  }
}
