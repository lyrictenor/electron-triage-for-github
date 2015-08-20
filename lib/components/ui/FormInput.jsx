import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import { TextField } from 'material-ui';

let FormInput = React.createClass({
  propTypes: {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    style: PropTypes.object,
    fullWidth: PropTypes.bool
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
    const { placeholder, name, type, style, fullWidth } = this.props;

    return (
      <TextField
        hintText={placeholder}
        type={type || 'text'}
        fullWidth={fullWidth}
        defaultValue={this.getValue()}
        onChange={this.changeValue}
        errorText={errorMessage}
        floatingLabelText={name}
        style={style}
        />
    );
  }
});
export default FormInput;
