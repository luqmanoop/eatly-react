import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../presentation/Input';
import Button from '../../presentation/Button';
import formValidator from '../../../utils/formValidator';
import { signUp } from '../../../actions/auth';

const {
  _required, _minValue6, _minValue3, _email, _alphaNumeric, _passwordMatch,
} = formValidator;

class SignupForm extends Component {
  submit = async (formData) => {
    const { signUp: dispatchSignUp } = this.props;
    await dispatchSignUp(formData);
  };

  render() {
    const {
      fullname, email, password, confirmPassword,
    } = {
      fullname: ['fullName', 'Full name'],
      email: ['email', 'Email'],
      password: ['password', 'Password'],
      confirmPassword: ['confirmPassword', 'Confirm password'],
    };
    const {
      handleSubmit, pristine, submitting, auth,
    } = this.props;
    return (
      <form className="form signup" onSubmit={handleSubmit(this.submit)}>
        <h1 className="form-title">Register</h1>
        <h3 className="form-sub-title">Order delicious fast food delivered to your doorstep</h3>
        {auth && auth.error && (
          <span className={auth.error.signup ? 'form-error' : ''}>{auth.error.signup}</span>
        )}
        <Field
          validate={[_required, _minValue3]}
          id={fullname[0]}
          name={fullname[0]}
          label={fullname[1]}
          component={Input}
        />
        <Field
          validate={[_required, _email]}
          id={email[0]}
          type={email[0]}
          name={email[0]}
          label={email[1]}
          component={Input}
        />
        <Field
          id={password[0]}
          name={password[0]}
          type={password[0]}
          label={password[1]}
          validate={[_required, _alphaNumeric, _minValue6]}
          component={Input}
        />
        <Field
          id={confirmPassword[0]}
          name={confirmPassword[0]}
          type={password[0]}
          label={confirmPassword[1]}
          validate={[_required, _passwordMatch]}
          component={Input}
        />
        <div className="input-group">
          <Button
            classes="btn-success"
            disabled={pristine || submitting}
            type="submit"
            title="Sign up"
          />
        </div>
      </form>
    );
  }
}

SignupForm.defaultProps = {
  handleSubmit: null,
  signUp: null,
  submitting: false,
  pristine: false,
  auth: null,
};

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  signUp: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  auth: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { signUp },
)(reduxForm({ form: 'signup' })(SignupForm));
