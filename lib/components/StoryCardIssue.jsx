import React, { Component, PropTypes } from 'react';
//import { Paper } from 'material-ui';
import trimWidth from '../utils/trim-width';

class StoryCardIssue extends Component {
  render() {
    const { story } = this.props;
    const { repo, issue } = story;
    return (
      <div>i {repo.fullName}#{issue.number} title:{trimWidth(issue.title, 50)} body:{trimWidth(issue.bodyText, 100)} issue:{issue.state} c:{issue.comments}</div>
    );
  }
}

StoryCardIssue.propTypes = {
  story: PropTypes.object.isRequired
};

export default StoryCardIssue;
