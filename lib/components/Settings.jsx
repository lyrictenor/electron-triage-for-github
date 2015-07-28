import React, { Component } from 'react';
import Formsy from 'formsy-react';

import FormInput from './ui/FormInput.jsx';
import enableButton from '../utils/enableButton';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { canSubmit: false };
  }

  render() {
    const submitText = (this.state.canSubmit) ? 'Save' : 'Invalid';
    return (
      <Formsy.Form
        onValidSubmit={''}
        onValid={''}
        onInvalid={''}
        className='settings'
        >
        <FormInput
          name='apiendpoint'
          placeholder={''}
          validationError='Api Endpoint is required'
          value={''}
          required />
        <FormInput
          name='webendpoint'
          placeholder={''}
          validationError='Web Endpoint is required'
          value={''}
          required />
        <FormInput
          name='token'
          type='password'
          value={''}
          helpBlock='Blank OR Just 40 characters' />
        <a
          href={''}
          onClick={''} >
          Get AccessToken
        </a>.
        <button
          className={''}
          type='submit'
          {...enableButton(this.state.canSubmit)}
          >
          {submitText}
        </button>
      </Formsy.Form>
    );
  }
}
