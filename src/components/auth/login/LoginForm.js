import React from 'react';
import { Field, reduxForm } from 'redux-form';
import propTypes from 'prop-types';
import InputField from '../../presentation/Input';
import Button from '../../presentation/Button';

const LoginForm = ({ handleSubmit }) => (
  <form className="form login" onSubmit={handleSubmit}>
    <h1 className="form-title">Login</h1>
    <h3 className="form-sub-title">Enjoy Eatly fast food delivered to your doorstep</h3>
    <Field name="email" id="email" label="Email" component={InputField} type="email" />
    <Field name="password" id="password" label="Password" component={InputField} type="password" />
    <div className="input-group">
      <Button title="Login" classes="btn btn-success" type="submit" />
    </div>
  </form>
);

LoginForm.defaultProps = {
  handleSubmit: () => {},
};

LoginForm.propTypes = {
  handleSubmit: propTypes.func,
};

export default reduxForm({ form: 'login' })(LoginForm);
