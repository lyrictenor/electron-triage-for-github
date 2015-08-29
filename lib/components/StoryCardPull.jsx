import React, { Component, PropTypes } from 'react';
//import { Paper } from 'material-ui';
import trimWidth from '../utils/trim-width';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';

class StoryCardPull extends Component {
  render() {
    const { story } = this.props;
    const { repo, pull, issue, status } = story;
    issue;
    const statusState = (status.totalCount >= 1)
      ? (<span>status:{status.state}</span>)
      : (<span>status:-</span>);
    return (
      <div>
        p
        |{repo.fullName}#{pull.number}
        |{pull.head.label}
        |title:
          <a
            href={pull.htmlUrl}
            onClick={electronOpenLinkInBrowser.bind(this)}
            >
            {trimWidth(pull.title, {length: 50})}
          </a>
        |body:{trimWidth(pull.bodyText, {length: 100})}
        |issue:{pull.state}
        |c:{pull.comments}
        |rc:{pull.reviewComments}
        |+{pull.additions}-{pull.deletions}
        |{statusState}
      </div>
    );
  }
}

StoryCardPull.propTypes = {
  story: PropTypes.object.isRequired
};

export default StoryCardPull;
