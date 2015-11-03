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
    const statuses = story.get('statuses');
    const statusesByKey = story.get('statusesByKey');
    const branches = story.get('branches');
    const branchesByRepoId = story.get('branchesByRepoId');
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
        let statusKey = null;
        if (pull && pull.head && repo) {
          statusKey = `${repo.fullName}#${pull.head.sha}`;
        }
        let status = null;
        if (statuses.has(statusKey)) {
          status = statusesByKey.get(statusKey);
        }
        // avoid name `branch`
        let branchObject = null;
        if (repo && branches.has(repo.id) && pull && pull.head) {
          const repoBranches = branchesByRepoId.get(repo.id);
          const branchName = pull.head.ref;
          if (repoBranches.has(branchName)) {
            branchObject = repoBranches.get(branchName);
          }
        }

        return (
          <StoryCardPull
            key={issue.id}
            issue={issue}
            repo={repo}
            pull={pull}
            status={status}
            branchObject={branchObject}
            {...props}
            />
        );
      }
      return (
        <StoryCardIssue
          key={issue.id}
          issue={issue}
          repo={repo}
          {...props}
          />
      );
    });

    if (storyCards.length > 0) {
      return (
        <div>
          {storyCards}
        </div>
      );
    }

    return (
      <div>
        <StoryCardEmpty />
      </div>
    );
  }
}
StoryList.propTypes = {
  story: PropTypes.object.isRequired,
};


export default StoryList;
