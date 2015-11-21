import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  fetchStories,
  reloadStory,
  toggleStoryState,
  deleteStoryBranch,
  mergeStoryPullRequest,
} from '../actions/storyActionCreators';
import {
  IconButton,
  CircularProgress,
} from 'material-ui';
import NavigationRefresh from 'material-ui/lib/svg-icons/navigation/refresh';
import StoryList from './StoryList.jsx';
import Header from './Header.jsx';
import moment from 'moment';
import {
  tryToLogIn,
} from '../utils/configs';

export class Home extends Component {
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    this.props.fetchStories();
  }
  render() {
    const { story, appGlobal, ...props } = this.props;// eslint-disable-line no-redeclare
    let lastStoryUpdated = '-';
    if (appGlobal.get('storyUpdatedAt')) {
      lastStoryUpdated = moment(appGlobal.get('storyUpdatedAt')).format();
    }
    let lastAutopiloted = '-';
    if (appGlobal.get('autopilotedAt')) {
      lastAutopiloted = moment(appGlobal.get('autopilotedAt')).format();
    }
    const userTryToLogIn = tryToLogIn(appGlobal);
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
          <span>
            Last updated: {lastStoryUpdated}
          </span>
          <span
            style={{
              margin: '0 0.4rem',
            }}
            >
            Last autopiloted: {lastAutopiloted}
          </span>
          <IconButton
            tooltip="refresh"
            tooltipPosition="bottom-right"
            touch
            style={{
              margin: '0 0.4rem',
            }}
            onClick={this.props.fetchStories}
            >
            {appGlobal.get('autopiloting') ?
              <CircularProgress
                mode="indeterminate"
                size={0.3}
                />
              :
              <NavigationRefresh />
            }
          </IconButton>
        </div>
        <StoryList
          story={story}
          userTryToLogIn={userTryToLogIn}
          {...props}
          />
      </div>
    );
  }
}

Home.propTypes = {
  story: PropTypes.object.isRequired,
  fetchStories: PropTypes.func.isRequired,
  appGlobal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    story: state.story,
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
