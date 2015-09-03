import React, { Component, PropTypes } from 'react';
// import { Paper } from 'material-ui';
import trimWidth from '../utils/trim-width';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { RaisedButton } from 'material-ui';

class StoryCardIssue extends Component {
  render() {
    const { story } = this.props;
    const { repo, issue } = story;
    return (
      <div>
        <div>
          i
          |{repo.fullName}#{issue.number}
          |title:
          <a
            href={issue.htmlUrl}
            onClick={electronOpenLinkInBrowser.bind(this)}
            >
            {trimWidth(issue.title, {length: 50})}
          </a>
          |body:{trimWidth(issue.bodyText, {length: 100})}
          |issue:{issue.state}
          |c:{issue.comments}
        </div>
        <div>
          <RaisedButton label="reload" />
          <RaisedButton label="close" disabled={issue.state !== 'open'} />
          <RaisedButton label="reopen" disabled={issue.state === 'open'} />
          <RaisedButton label="merge" disabled={true} />
          <RaisedButton label="revert" disabled={true} />
          <RaisedButton label="delete branch" disabled={true} />
        </div>
      </div>
    );
  }
}

StoryCardIssue.propTypes = {
  story: PropTypes.object.isRequired,
};

export default StoryCardIssue;
