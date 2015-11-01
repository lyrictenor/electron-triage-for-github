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
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import ActionSchedule from 'material-ui/lib/svg-icons/action/schedule';
import ErrorOutline from 'material-ui/lib/svg-icons/alert/error-outline';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ErrorWarning from 'material-ui/lib/svg-icons/alert/warning';
import CommunicationComment from 'material-ui/lib/svg-icons/communication/comment';
import CommunicationForum from 'material-ui/lib/svg-icons/communication/forum';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';

import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import moment from 'moment';

class StoryCardPull extends Component {
  render() {
    const {
      issue,
      repo,
      pull,
      reloadStory,
    } = this.props;
    const identifier = {// eslint-disable-line no-unused-vars
      owner: repo && repo.owner.login,
      repo: repo && repo.name,
      number: issue.number,
    };
    const branch = false;

    const ciState = 'unknown';
    let iconColor;
    if (pull.state === 'open') {
      iconColor = Colors.lightGreen400;
    } else if (pull.state === 'closed' && pull.merged) {
      iconColor = Colors.deepPurple400;
    } else if (pull.state === 'closed') {
      iconColor = Colors.red400;
    } else {
      iconColor = Colors.red400;
    }

    let ciStateIcon;
    if (ciState === 'success') {
      ciStateIcon = (
        <ActionDone
          color={Colors.lightGreen700}
          />
      );
    } else if (ciState === 'pending') {
      ciStateIcon = (
        <ActionSchedule
          color={Colors.yellow700}
          />
      );
    } else if (ciState === 'error') {
      ciStateIcon = (
        <ErrorOutline
          color={Colors.grey700}
          />
      );
    } else if (ciState === 'failure') {
      ciStateIcon = (
        <NavigationClose
          color={Colors.red700}
          />
      );
    } else {
      ciStateIcon = (
        <ErrorWarning
          color={Colors.grey300}
          />
      );
    }
    let commentColor;
    if (pull.comments > 0) {
      commentColor = Colors.grey700;
    } else {
      commentColor = Colors.grey300;
    }
    let reviewCommentColor;
    if (pull.reviewComments > 0) {
      reviewCommentColor = Colors.grey700;
    } else {
      reviewCommentColor = Colors.grey300;
    }
    const additionsColor = Colors.lightGreen700;
    const deletionsColor = Colors.red700;

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
          {pull.head.label} {ciStateIcon}<br />
          {pull.updatedAt && moment(pull.updatedAt).format()}<br />
          <CommunicationForum
            color={commentColor}
            />
          <span style={{color: commentColor}}>{pull.comments}</span>

          <CommunicationComment
            color={reviewCommentColor}
            />
          <span style={{color: reviewCommentColor}}>{pull.reviewComments}</span>

          <ContentAdd
            color={additionsColor}
            />
          <span style={{color: additionsColor}}>{pull.additions}</span>

          <ContentRemove
            color={deletionsColor}
            />
          <span style={{color: deletionsColor}}>{pull.deletions}</span>
        </CardText>
        <CardActions
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
            disabled={pull.state !== 'open'}
            />
          <RaisedButton
            label="reopen"
            disabled={pull.state === 'open'}
            />
          <RaisedButton
            label="merge"
            disabled={pull.state !== 'open' || pull.merged || !pull.mergeable}
            />
          <RaisedButton label="revert" disabled />
          <RaisedButton
            label="delete branch"
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
          reviewComments: {pull.reviewComments}<br />
          additions: {pull.additions}<br />
          deletions: {pull.deletions}<br />
          updatedAt: {pull.updatedAt && moment(pull.updatedAt).format()}<br />
          createdAt: {pull.createdAt && moment(pull.createdAt).format()}<br />
          mergedAt: {pull.mergedAt && moment(pull.mergedAt).format()}<br />
          closedAt: {pull.closedAt && moment(pull.closedAt).format()}
        </CardText>
      </Card>
    );
  }
}

StoryCardPull.propTypes = {
  issue: PropTypes.object.isRequired,
  repo: PropTypes.object.isRequired,
  pull: PropTypes.object.isRequired,
  reloadStory: PropTypes.func.isRequired,
};

export default StoryCardPull;
