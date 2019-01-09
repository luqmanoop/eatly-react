import React from 'react';
import { Field, reduxForm } from 'redux-form';
import propTypes from 'prop-types';
import Input from '../../presentation/Input';
import Button from '../../presentation/Button';

const LoginForm = ({ handleSubmit }) => (
  <form className="form login" onSubmit={handleSubmit}>
    <h1 className="form-title">Login</h1>
    <h3 className="form-sub-title">Enjoy Eatly fast food delivered to your doorstep</h3>
    <div className="input-group">
      <label htmlFor="email">Email</label>
      <Field name="email" id="email" component={Input} type="email" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <Field name="password" id="password" component={Input} type="password" />
    </div>
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
