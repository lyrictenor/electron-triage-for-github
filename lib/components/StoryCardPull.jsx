import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
} from 'material-ui';

class StoryCardPull extends Component {
  render() {
    const {
      issueId,
      } = this.props;

    return (
      <Card
        initiallyExpanded={false}
        >
        <CardText>
          pull! {issueId}
        </CardText>
      </Card>
    );
  }
}

StoryCardPull.propTypes = {
  issueId: PropTypes.object.isRequired,
};

export default StoryCardPull;
