import React, { Component, PropTypes } from 'react';
//import { Paper } from 'material-ui';

class StoryCardPull extends Component {
  render() {
    const { story } = this.props;
    return (
      <div>p {story.repo.fullName} {story.issue.title} {story.issue.state} {story.status.state}</div>
    );
  }
}

StoryCardPull.propTypes = {
  story: PropTypes.object.isRequired
};

export default StoryCardPull;
