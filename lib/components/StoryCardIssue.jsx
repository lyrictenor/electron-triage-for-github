import React, { Component, PropTypes } from 'react';
//import { Paper } from 'material-ui';

class StoryCardIssue extends Component {
  render() {
    const { story } = this.props;
    return (
      <div>i {story.repo.fullName} {story.issue.title} {story.issue.state}</div>
    );
  }
}

StoryCardIssue.propTypes = {
  story: PropTypes.object.isRequired
};

export default StoryCardIssue;
