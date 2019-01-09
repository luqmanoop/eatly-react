import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Input from '../../presentation/Input';

const input = {
  fullname: 'full-name',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirm-password',
};

const SignupForm = ({ handleSubmit }) => (
  <form className="form signup" onSubmit={handleSubmit}>
    <h1 className="form-title">Register</h1>
    <h3 className="form-sub-title">Order delicious fast food delivered to your doorstep</h3>
    <div className="input-group">
      <label htmlFor={input.fullname}>Full name</label>
      <Field id={input.fullname} name={input.fullname} component={Input} />
    </div>
    <div className="input-group">
      <label htmlFor={input.email}>Email</label>
      <Field id={input.email} type={input.email} name={input.email} component={Input} />
    </div>
    <div className="input-group">
      <label htmlFor={input.password}>Password</label>
      <Field id={input.password} name={input.password} type={input.password} component={Input} />
    </div>
    <div className="input-group">
      <label htmlFor={input.confirmPassword}>Confirm password</label>
      <Field
        id={input.confirmPassword}
        name={input.confirmPassword}
        type="password"
        component={Input}
      />
    </div>
    <div className="input-group">
      <button className="btn btn-success" type="submit">
        Sign up
      </button>
    </div>
  </form>
);

SignupForm.defaultProps = {
  handleSubmit: () => {},
};

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'signup' })(SignupForm);
