import React, { Component } from 'react';
import { Link } from 'react-router';
import urls from '../utils/urls';

export default class Home extends Component {
  render() {
    return (
      <div>Home, <Link to={urls.get('settings')}>settings</Link></div>
    );
  }
}
