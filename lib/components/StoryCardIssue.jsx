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
import CommunicationComment from 'material-ui/lib/svg-icons/communication/comment';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { RaisedButton } from 'material-ui';

class StoryCardIssue extends Component {
  render() {
    const {
      story,
      reloadStory,
      toggleStoryState,
      } = this.props;
    const { repo, issue } = story;
    const identifier = {
      owner: repo.owner.login,
      repo: repo.name,
      number: issue.number,
    };
    let iconColor;
    if (issue.state === 'open') {
      iconColor = '#6cc644';
    } else if (issue.state === 'closed') {
      iconColor = '#bd2c00';
    } else {
      iconColor = '#bd2c00';
    }
    let commentColor;
    if (issue.comments > 0) {
      commentColor = 'inherit';
    } else {
      commentColor = Colors.grey300;
    }
    return (
      <Card
        initiallyExpanded={false}
        >
        <CardHeader
          title={issue.title}
          subtitle={`${repo.fullName}#${issue.number}`}
          avatar={<Avatar backgroundColor={iconColor}>I</Avatar>}
          />
        <CardText>
          <CommunicationComment
            color={commentColor}
            />
          <span style={{color: commentColor}}>{issue.comments}</span>
          updatedAt:{issue.updatedAt.toString()}
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
            onClick={electronOpenLinkInBrowser.bind(this, issue.htmlUrl)}
            />
          <RaisedButton
            label="close"
            onClick={toggleStoryState.bind(this, identifier)}
            disabled={issue.state !== 'open'}
            />
          <RaisedButton
            label="reopen"
            onClick={toggleStoryState.bind(this, identifier)}
            disabled={issue.state === 'open'}
            />
          <RaisedButton label="merge" disabled />
          <RaisedButton label="revert" disabled />
          <RaisedButton label="delete branch" disabled />
        </CardActions>
        <CardText
          expandable
          >
          body:<br />
          {issue.bodyText}
        </CardText>
        <CardText
          expandable
          >
          htmlUrl: {issue.htmlUrl}<br />
          issueState: {issue.state}<br />
          comments: {issue.comments}<br />
          updatedAt: {issue.updatedAt.toString()}<br />
          createdAt: {issue.createdAt.toString()}<br />
          closedAt: {issue.closedAt && issue.closedAt.toString()}
        </CardText>
      </Card>
    );
  }
}

StoryCardIssue.propTypes = {
  story: PropTypes.object.isRequired,
  reloadStory: PropTypes.func.isRequired,
  toggleStoryState: PropTypes.func.isRequired,
};

export default StoryCardIssue;
