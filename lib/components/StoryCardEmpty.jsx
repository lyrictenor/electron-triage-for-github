import React, { Component } from 'react';
import {
  Card,
  CardText,
} from 'material-ui';

export class StoryCardEmpty extends Component {
  render() {
    return (
      <Card>
        <CardText>
          There is no story.
        </CardText>
      </Card>
    );
  }
}

export default StoryCardEmpty;
