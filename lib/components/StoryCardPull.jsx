import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
} from 'material-ui';

class StoryCardPull extends Component {
  render() {
    const {
      issue,
    } = this.props;

    return (
      <Card
        initiallyExpanded={false}
        >
        <CardText>
          pull! {issue}
        </CardText>
      </Card>
    );
  }
}

StoryCardPull.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default StoryCardPull;
