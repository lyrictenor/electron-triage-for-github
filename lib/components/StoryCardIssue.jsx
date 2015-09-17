import React, { Component, PropTypes } from 'react';
// import { Paper } from 'material-ui';
import trimWidth from '../utils/trim-width';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { RaisedButton } from 'material-ui';

class StoryCardIssue extends Component {
  render() {
    const {
      story,
      reloadStory,
      closeStory,
      } = this.props;
    const { repo, issue } = story;
    const identifier = {
      owner: repo.owner.login,
      repo: repo.name,
      number: issue.number,
    };
    return (
      <div>
        <div>
          i
          |{repo.fullName}#{issue.number}
          |title:
            {issue.title}
          |body:{trimWidth(issue.bodyText, {length: 100})}
          |issue:{issue.state}
          |c:{issue.comments}
        </div>
        <div>
          |updatedAt:{issue.updatedAt.toString()}
          |createdAt:{issue.createdAt.toString()}
          |closedAt:{issue.closedAt && issue.closedAt.toString()}
        </div>
        <div>
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
            onClick={closeStory.bind(this, identifier)}
            disabled={issue.state !== 'open'}
            />
          <RaisedButton label="reopen" disabled={issue.state === 'open'} />
          <RaisedButton label="merge" disabled />
          <RaisedButton label="revert" disabled />
          <RaisedButton label="delete branch" disabled />
        </div>
      </div>
    );
  }
}

StoryCardIssue.propTypes = {
  story: PropTypes.object.isRequired,
  reloadStory: PropTypes.func.isRequired,
  closeStory: PropTypes.func.isRequired,
};

export default StoryCardIssue;
