import React, { Component, PropTypes } from 'react';
import StoryCardPull from './StoryCardPull.jsx';
import StoryCardIssue from './StoryCardIssue.jsx';
import StoryCardEmpty from './StoryCardEmpty.jsx';

class StoryList extends Component {
  render() {
    const { story, ...props } = this.props;
    const issuesOrdered = story.get('issuesOrdered');
    const pulls = story.get('pulls');
    const storyCards = issuesOrdered.map((issueId) => {
      if (pulls.has(issueId)) {
        return (
          <StoryCardPull
            issueId={issueId}
            {...props}
            />
        );
      }
      return (
        <StoryCardIssue
          issueId={issueId}
          {...props}
          />
      );
    });

    return (
      <div>
      {storyCards.length > 0 ?
        {storyCards}
        :
        <StoryCardEmpty />
      }
      </div>
    );
  }
}
StoryList.propTypes = {
  story: PropTypes.array.isRequired,
};


export default StoryList;
