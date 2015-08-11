import React, { Component } from 'react';
import { Link } from 'react-router';
import Crossing from 'crossing';
import urlTable from '../containers/urlTable';
const urls = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
urls.load(urlTable);

export default class Home extends Component {
  render() {
    return (
      <div>Home, <Link to={urls.get('settings')}>settings</Link></div>
    );
  }
}
