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

export class Home extends Component {
  componentWillMount() {
    this.loadData();
  }
  loadData() {
    this.props.fetchStories();
  }
  render() {
    const { stories, ...props } = this.props;
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
          Last updated: 2015-10-14 12:23:34
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
};

function mapStateToProps(state) {
  return {
    stories: state.story,
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
