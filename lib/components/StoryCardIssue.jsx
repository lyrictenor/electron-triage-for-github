import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
} from 'material-ui';
import trimWidth from '../utils/trim-width';
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
    return (
      <Card>
        <CardText>
          i
          |{repo.fullName}#{issue.number}
          |title:
          {issue.title}
          |body:{trimWidth(issue.bodyText, {length: 100})}
          |issue:{issue.state}
          |c:{issue.comments}
        </CardText>
        <CardText>
          |updatedAt:{issue.updatedAt.toString()}
          |createdAt:{issue.createdAt.toString()}
          |closedAt:{issue.closedAt && issue.closedAt.toString()}
        </CardText>
        <CardActions>
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
