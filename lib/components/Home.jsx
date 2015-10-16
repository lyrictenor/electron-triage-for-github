import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import urls from '../utils/urls';
import {
  fetchStories,
  reloadStory,
  toggleStoryState,
  deleteStoryBranch,
  mergeStoryPullRequest,
} from '../actions/storyActionCreators';
import {
  IconButton,
} from 'material-ui';
import NavigationRefresh from 'material-ui/lib/svg-icons/navigation/refresh';
import StoryList from './StoryList.jsx';
import Header from './Header.jsx';
import moment from 'moment';

export class Home extends Component {
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    this.props.fetchStories();
  }
  render() {
    const { stories, appGlobal, ...props } = this.props;
    return (
      <div>
        <Header
          title={'Stories'}
          />
        <div
          style={{
            margin: '0.6rem 1.4rem',
          }}
          >
          Last updated: {(appGlobal.get('storyUpdatedAt')) ? moment(appGlobal.get('storyUpdatedAt')).format() : '-'}
          <IconButton
            tooltip="refresh"
            tooltipPosition="bottom-right"
            touch
            onClick={this.props.fetchStories}
            >
            <NavigationRefresh />
          </IconButton>
        </div>
        <StoryList
          stories={stories}
          {...props}
          />
        <div
          style={{
            margin: '2rem 1.4rem',
          }}
          >
          <Link to={urls.get('settings')}>settings</Link>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  stories: PropTypes.array.isRequired,
  fetchStories: PropTypes.func.isRequired,
  appGlobal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    stories: state.story,
    appGlobal: state.appGlobal,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchStories,
    reloadStory,
    toggleStoryState,
    deleteStoryBranch,
    mergeStoryPullRequest,
  }
)(Home);
