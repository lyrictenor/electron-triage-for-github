import React, { Component, PropTypes } from 'react';
import StoryCardPull from './StoryCardPull.jsx';
import StoryCardIssue from './StoryCardIssue.jsx';
import StoryCardEmpty from './StoryCardEmpty.jsx';

class StoryList extends Component {
  render() {
    const { story, ...props } = this.props;
    const issuesOrdered = story.get('issuesOrdered');
    const issuesById = story.get('issuesById');
    const repos = story.get('repos');
    const reposById = story.get('reposById');
    const pulls = story.get('pulls');
    const pullsByKey = story.get('pullsByKey');
    const storyCards = Array.from(issuesOrdered).reverse().map((issueId) => {
      const issue = issuesById.get(issueId);
      let repo = null;
      if (issue && issue.repository && repos.has(issue.repository.id)) {
        repo = reposById.get(issue.repository.id);
      }
      let pullKey = null;
      if (issue && repo) {
        pullKey = `${repo.fullName}#${issue.number}`;
      }
      if (pulls.has(pullKey)) {
        const pull = pullsByKey.get(pullKey);
        return (
          <StoryCardPull
            issue={issue}
            repo={repo}
            pull={pull}
            {...props}
            />
        );
      }
      return (
        <StoryCardIssue
          issue={issue}
          repo={repo}
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
  story: PropTypes.object.isRequired,
};


export default StoryList;
