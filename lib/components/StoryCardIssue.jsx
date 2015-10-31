import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
  CardHeader,
  Avatar,
  Styles,
  RaisedButton,
} from 'material-ui';
const { Colors } = Styles;
import CommunicationForum from 'material-ui/lib/svg-icons/communication/forum';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import moment from 'moment';

class StoryCardIssue extends Component {
  render() {
    const {
      issue,
      repo,
    } = this.props;
    const identifier = {// eslint-disable-line no-unused-vars
      owner: repo && repo.owner.login,
      repo: repo && repo.name,
      number: issue.number,
    };
    let iconColor;
    if (issue.state === 'open') {
      iconColor = Colors.lightGreen400;
    } else if (issue.state === 'closed') {
      iconColor = Colors.red400;
    } else {
      iconColor = Colors.red400;
    }
    let commentColor;
    if (issue.comments > 0) {
      commentColor = Colors.grey700;
    } else {
      commentColor = Colors.grey300;
    }

    return (
      <Card
        initiallyExpanded={false}
        >
        <CardHeader
          title={issue.title}
          subtitle={`${repo && repo.fullName}#${issue.number}`}
          avatar={<Avatar backgroundColor={iconColor}>I</Avatar>}
          />
        <CardText>
          {issue.updatedAt && moment(issue.updatedAt).format()}<br />
          <CommunicationForum
            color={commentColor}
            />
          <span style={{color: commentColor}}>{issue.comments}</span>
        </CardText>
        <CardActions
          showExpandableButton
          >
          <RaisedButton
            label="reload"
            />
          <RaisedButton
            label="jump"
            onClick={electronOpenLinkInBrowser.bind(this, issue.htmlUrl)}
            />
          <RaisedButton
            label="close"
            disabled={issue.state !== 'open'}
            />
          <RaisedButton
            label="reopen"
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
          updatedAt: {issue.updatedAt && moment(issue.updatedAt).format()}<br />
          createdAt: {issue.createdAt && moment(issue.createdAt).format()}<br />
          closedAt: {issue.closedAt && moment(issue.closedAt).format()}
        </CardText>
      </Card>
    );
  }
}

StoryCardIssue.propTypes = {
  issue: PropTypes.object.isRequired,
  repo: PropTypes.object.isRequired,
};

export default StoryCardIssue;
