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
import { Paper } from 'material-ui';
import StoryList from './StoryList.jsx';

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
        <h3>
          Stories
        </h3>
        <Paper
          zDepth={1}
          >
          <StoryList
            stories={stories}
            {...props}
            />
        </Paper>
        <Link to={urls.get('settings')}>settings</Link>
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
