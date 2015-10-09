import React, { Component, PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
// import validateContact from './validateContact';

function validateContact(data) {
  const errors = {};
  if (!data.name) {
    errors.name = 'Required';
  }
  if (data.address && data.address.length > 50) {
    errors.address = 'Must be fewer than 50 characters';
  }
  if (!data.phone) {
    errors.phone = 'Required';
  } else if (!/\d{3}-\d{3}-\d{4}/.test(data.phone)) {
    errors.phone = 'Phone must match the form "999-999-9999"';
  }
  return errors;
}

export class SettingForm extends Component {

  render() {
    const { fields: {name, address, phone}, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" {...name}/>     // will pass value, onBlur and onChange
        {name.error && name.touched && <div>{name.error}</div>}

        <label>Address</label>
        <input type="text" {...address}/>  // will pass value, onBlur and onChange
        {address.error && address.touched && <div>{address.error}</div>}

        <label>Phone</label>
        <input type="text" {...phone}/>    // will pass value, onBlur and onChange
        {phone.error && phone.touched && <div>{phone.error}</div>}

        <button onClick={handleSubmit}>Submit</button>
      </form>
    );
  }
}

SettingForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// apply connectReduxForm() and include synchronous validation
SettingForm = connectReduxForm({
  form: 'setting',                      // the name of your form and the key to
                                        // where your form's state will be mounted
  fields: ['name', 'address', 'phone'], // a list of all your fields in your form
  validate: validateContact,            // a synchronous validation function
})(SettingForm);

// export the wrapped component
export default SettingForm;
