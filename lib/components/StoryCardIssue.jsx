import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
} from 'material-ui';

class StoryCardIssue extends Component {
  render() {
    const {
      issueId,
      } = this.props;

    return (
      <Card
        initiallyExpanded={false}
        >
        <CardText>
          issue! {issueId}
        </CardText>
      </Card>
    );
  }
}

StoryCardIssue.propTypes = {
  issueId: PropTypes.object.isRequired,
};

export default StoryCardIssue;
