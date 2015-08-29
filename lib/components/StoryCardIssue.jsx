import React, { Component, PropTypes } from 'react';
//import { Paper } from 'material-ui';
import trimWidth from '../utils/trim-width';

class StoryCardIssue extends Component {
  render() {
    const { story } = this.props;
    const { repo, issue } = story;
    return (
      <div>i {repo.fullName}#{issue.number} title:<a href={issue.htmlUrl}>{trimWidth(issue.title, {length: 50})}</a> body:{trimWidth(issue.bodyText, {length: 100})} issue:{issue.state} c:{issue.comments}</div>
    );
  }
}

StoryCardIssue.propTypes = {
  story: PropTypes.object.isRequired
};

export default StoryCardIssue;
