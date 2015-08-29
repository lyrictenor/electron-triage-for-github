import React, { Component, PropTypes } from 'react';
//import { Paper } from 'material-ui';

class StoryCardPull extends Component {
  render() {
    const { story } = this.props;
    const { repo, pull, issue, status } = story;
    issue;
    const statusState = (status.totalCount >= 1)
      ? (<span>status:{status.state}</span>)
      : (<span>status:-</span>);
    return (
      <div>p {repo.fullName}#{pull.number} {pull.head.label} title:{pull.title} body:{pull.bodyText} issue:{pull.state} {statusState}</div>
    );
  }
}

StoryCardPull.propTypes = {
  story: PropTypes.object.isRequired
};

export default StoryCardPull;
