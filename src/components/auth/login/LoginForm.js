import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../../presentation/Input';
import Button from '../../presentation/Button';
import { login } from '../../../actions';

class LoginForm extends Component {
  onLogin = async (formValues) => {
    const { dispatchLogin } = this.props;
    await dispatchLogin(formValues);
  };

  render() {
    const { handleSubmit, auth } = this.props;
    return (
      <form className="form login" onSubmit={handleSubmit(this.onLogin)}>
        <h1 className="form-title">Login</h1>
        <h3 className="form-sub-title">Enjoy Eatly fast food delivered to your doorstep</h3>
        {auth && auth.error && <p className="form-error">{auth.error.message}</p>}
        <Field name="email" id="email" label="Email" component={InputField} type="email" />
        <Field
          name="password"
          id="password"
          label="Password"
          component={InputField}
          type="password"
        />
        <div className="input-group">
          <Button title="Login" classes="btn btn-success" type="submit" />
        </div>
      </form>
    );
  }
}

LoginForm.defaultProps = {
  handleSubmit: null,
  dispatchLogin: null,
  auth: null,
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  dispatchLogin: PropTypes.func,
  auth: PropTypes.oneOfType([PropTypes.object]),
};

export default connect(
  ({ auth }) => ({ auth }),
  { dispatchLogin: login },
)(reduxForm({ form: 'login' })(LoginForm));
