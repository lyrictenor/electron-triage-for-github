import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
} from 'material-ui';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { RaisedButton } from 'material-ui';
import ActionInfoOutline from 'material-ui/lib/svg-icons/action/info-outline';

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
    const expandable = issue.bodyText ? true : false;
    let iconColor;
    if (issue.state === 'open') {
      iconColor = '#6cc644';
    } else if (issue.state === 'closed') {
      iconColor = '#bd2c00';
    } else {
      iconColor = '#bd2c00';
    }
    return (
      <Card
        initiallyExpanded={false}
        >
        <CardText>
          <ActionInfoOutline
            color={iconColor}
            />
          {issue.title}<br />
          {repo.fullName}#{issue.number}<br />
          |issue:{issue.state}
          |c:{issue.comments}
        </CardText>
        <CardText>
          updatedAt:{issue.updatedAt.toString()}<br />
          createdAt:{issue.createdAt.toString()}<br />
          closedAt:{issue.closedAt && issue.closedAt.toString()}
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
          {issue.bodyText}
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
