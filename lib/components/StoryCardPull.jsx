import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
} from 'material-ui';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { RaisedButton } from 'material-ui';

class StoryCardPull extends Component {
  render() {
    const {
      story,
      reloadStory,
      toggleStoryState,
      deleteStoryBranch,
      mergeStoryPullRequest,
      } = this.props;
    const { repo, pull, issue, status, branch } = story;
    const identifier = {
      owner: repo.owner.login,
      repo: repo.name,
      number: issue.number,
    };
    const statusState = (status.totalCount >= 1)
      ? (<span>status:{status.state}</span>)
      : (<span>status:-</span>);
    const expandable = pull.bodyText ? true : false;
    return (
      <Card
        initiallyExpanded={false}
        >
        <CardText>
          p
          |{repo.fullName}#{pull.number}
          |{pull.head.label}
          |title:
          {pull.title}
          |issue:{pull.state}
          |c:{pull.comments}
          |rc:{pull.reviewComments}
          |+{pull.additions}-{pull.deletions}
          |{statusState}
        </CardText>
        <CardText>
          updatedAt:{pull.updatedAt.toString()}<br />
          createdAt:{pull.createdAt.toString()}<br />
          mergedAt:{pull.mergedAt && pull.mergedAt.toString()}<br />
          closedAt:{pull.closedAt && pull.closedAt.toString()}
        </CardText>
        <CardActions
          actAsExpander={expandable}
          showExpandableButton={expandable}
          >
          <RaisedButton
            label="reload"
            onClick={reloadStory.bind(this, identifier)}
            />
          <RaisedButton
            label="jump"
            onClick={electronOpenLinkInBrowser.bind(this, pull.htmlUrl)}
            />
          <RaisedButton
            label="close"
            onClick={toggleStoryState.bind(this, identifier)}
            disabled={pull.state !== 'open'}
            />
          <RaisedButton
            label="reopen"
            onClick={toggleStoryState.bind(this, identifier)}
            disabled={pull.state === 'open'}
            />
          <RaisedButton
            label="merge"
            onClick={mergeStoryPullRequest.bind(this, identifier)}
            disabled={pull.state !== 'open' || pull.merged || !pull.mergeable}
            />
          <RaisedButton label="revert" disabled />
          <RaisedButton
            label="delete branch"
            onClick={deleteStoryBranch.bind(this, identifier)}
            disabled={!branch || pull.state === 'open'}
            />
        </CardActions>
        <CardText
          expandable
          >
          {pull.bodyText}
        </CardText>
      </Card>
    );
  }
}

StoryCardPull.propTypes = {
  story: PropTypes.object.isRequired,
  reloadStory: PropTypes.func.isRequired,
  toggleStoryState: PropTypes.func.isRequired,
  deleteStoryBranch: PropTypes.func.isRequired,
  mergeStoryPullRequest: PropTypes.func.isRequired,
};

export default StoryCardPull;
