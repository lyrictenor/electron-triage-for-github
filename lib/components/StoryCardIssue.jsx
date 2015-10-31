import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
} from 'material-ui';

class StoryCardIssue extends Component {
  render() {
    const {
      issue,
    } = this.props;

    return (
      <Card
        initiallyExpanded={false}
        >
        <CardText>
          issue! {issue}
        </CardText>
      </Card>
    );
  }
}

StoryCardIssue.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default StoryCardIssue;
