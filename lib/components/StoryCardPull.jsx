import React, { Component, PropTypes } from 'react';
// import { Paper } from 'material-ui';
import trimWidth from '../utils/trim-width';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { RaisedButton } from 'material-ui';

class StoryCardPull extends Component {
  render() {
    const {
      story,
      reloadStory,
      toggleStoryState,
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
    return (
      <div>
        <div>
          p
          |{repo.fullName}#{pull.number}
          |{pull.head.label}
          |title:
            {pull.title}
          |body:{trimWidth(pull.bodyText, {length: 100})}
          |issue:{pull.state}
          |c:{pull.comments}
          |rc:{pull.reviewComments}
          |+{pull.additions}-{pull.deletions}
          |{statusState}
        </div>
        <div>
          |updatedAt:{pull.updatedAt.toString()}
          |createdAt:{pull.createdAt.toString()}
          |mergedAt:{pull.mergedAt && pull.mergedAt.toString()}
          |closedAt:{pull.closedAt && pull.closedAt.toString()}
        </div>
        <div>
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
          <RaisedButton label="reopen" disabled={pull.state === 'open'} />
          <RaisedButton label="merge" disabled={pull.state !== 'open' || pull.merged || !pull.mergeable} />
          <RaisedButton label="revert" disabled />
          <RaisedButton label="delete branch" disabled={!branch} />
        </div>
      </div>
    );
  }
}

StoryCardPull.propTypes = {
  story: PropTypes.object.isRequired,
  reloadStory: PropTypes.func.isRequired,
  toggleStoryState: PropTypes.func.isRequired,
};

export default StoryCardPull;
