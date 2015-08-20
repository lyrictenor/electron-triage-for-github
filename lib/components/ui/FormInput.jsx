import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
//import { TextField } from 'material-ui';

let FormInput = React.createClass({
  propTypes: {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string
  },
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    return (
      <div>
        <label
          htmlFor={this.props.name}>
          {this.props.name}
        </label>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          placeholder={this.props.placeholder}
          />
        <span>{errorMessage}</span>
      </div>
    );
  }
});
export default FormInput;
