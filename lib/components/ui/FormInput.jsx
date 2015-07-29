import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import cx from 'classnames';

let FormInput = React.createClass({
  propTypes: {
    inputClassName: PropTypes.object.isRequired,
    outerClassName: PropTypes.object.isRequired,
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

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const outerClassName = cx(
      this.props.outerClassName,
      {
        'required': this.showRequired(),
        'error': this.showError()
      }
    );
    const inputClassName = cx(
      this.props.inputClassName,
      {
        'required': this.showRequired(),
        'error': this.showError()
      }
    );

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    return (
      <div className={outerClassName}>
        <label
          htmlFor={this.props.name}>
          {this.props.name}
        </label>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          className={inputClassName}
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
