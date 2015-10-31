import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardText,
} from 'material-ui';

class StoryCardPull extends Component {
  render() {
    const {
      issue,
      repo,
    } = this.props;
    const identifier = {// eslint-disable-line no-unused-vars
      owner: repo && repo.owner.login,
      repo: repo && repo.name,
      number: issue.number,
    };

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
  repo: PropTypes.object.isRequired,
};

export default StoryCardPull;
