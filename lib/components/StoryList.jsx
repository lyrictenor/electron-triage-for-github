import React, { Component, PropTypes } from 'react';
// import { Paper } from 'material-ui';
import StoryCardPull from './StoryCardPull.jsx';
import StoryCardIssue from './StoryCardIssue.jsx';
import {
  TYPE_ISSUE,
  TYPE_PULL
} from '../craftperson/story';

class StoryList extends Component {
  render() {
    const { stories, ...props } = this.props;
    const storyCards = stories.map((story) => {
      switch (story.type) {
      case TYPE_ISSUE:
        return (
          <StoryCardIssue
            story={story}
            {...props}
            />
        );
      case TYPE_PULL:
        return (
          <StoryCardPull
            story={story}
            {...props}
            />
        );
      default:
        return (
          <div></div>
        );
      }
    });

    return (
      <div>
      {storyCards.length > 0 ?
        {storyCards}
        :
        <h4>There is no story.</h4>
      }
      </div>
    );
  }
}
StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
};


export default StoryList;
