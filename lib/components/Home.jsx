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
