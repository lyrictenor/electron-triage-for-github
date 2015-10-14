import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
  CardHeader,
  Avatar,
  Styles,
} from 'material-ui';
const { Colors } = Styles;
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import ActionSchedule from 'material-ui/lib/svg-icons/action/schedule';
import ErrorOutline from 'material-ui/lib/svg-icons/alert/error-outline';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ActionHelpOutline from 'material-ui/lib/svg-icons/action/help-outline';
import CommunicationComment from 'material-ui/lib/svg-icons/communication/comment';

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
    let ciState;
    if (status.totalCount >= 1) {
      ciState = status.state;
    } else {
      ciState = 'unknown';
    }
    let iconColor;
    if (pull.state === 'open') {
      iconColor = '#6cc644';
    } else if (pull.state === 'closed' && pull.merged) {
      iconColor = '#6e5494';
    } else if (pull.state === 'closed') {
      iconColor = '#bd2c00';
    } else {
      iconColor = '#bd2c00';
    }

    let ciStateIcon;
    if (ciState === 'success') {
      ciStateIcon = (
        <ActionDone
          color={'#6cc644'}
          />
      );
    } else if (ciState === 'pending') {
      ciStateIcon = (
        <ActionSchedule
          color={'#cea61b'}
          />
      );
    } else if (ciState === 'error') {
      ciStateIcon = (
        <ErrorOutline
          color={'#767676'}
          />
      );
    } else if (ciState === 'failure') {
      ciStateIcon = (
        <NavigationClose
          color={'#bd2c00'}
          />
      );
    } else {
      ciStateIcon = (
        <ActionHelpOutline
          color={'#767676'}
          />
      );
    }
    let commentColor;
    if (pull.comments > 0) {
      commentColor = 'inherit';
    } else {
      commentColor = Colors.grey300;
    }

    return (
      <Card
        initiallyExpanded={false}
        >
        <CardHeader
          title={`${pull.title}`}
          subtitle={`${repo.fullName}#${pull.number}`}
          avatar={<Avatar backgroundColor={iconColor}>P</Avatar>}
          />
        <CardText>
          {pull.head.label}
          {ciStateIcon}<br />
          <CommunicationComment
            color={commentColor}
            />
          <span style={{color: commentColor}}>{pull.comments}</span>
          |rc:{pull.reviewComments}
          |+{pull.additions}-{pull.deletions}<br />
          updatedAt:{pull.updatedAt.toString()}<br />
        </CardText>
        <CardActions
          actAsExpander
          showExpandableButton
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
          body:<br />
          {pull.bodyText}
        </CardText>
        <CardText
          expandable
          >
          htmlUrl: {pull.htmlUrl}<br />
          issueState: {pull.state}<br />
          ciState: {ciState}<br />
          merged: {pull.merged ? 'true' : 'false'}<br />
          comments: {pull.comments}<br />
          updatedAt: {pull.updatedAt.toString()}<br />
          createdAt: {pull.createdAt.toString()}<br />
          mergedAt: {pull.mergedAt && pull.mergedAt.toString()}<br />
          closedAt: {pull.closedAt && pull.closedAt.toString()}
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
