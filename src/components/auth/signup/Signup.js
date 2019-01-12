import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';

const Signup = ({ auth }) => (
  <Fragment>{!auth.user ? <SignupForm /> : <Redirect to="/" />}</Fragment>
);

Signup.defaultProps = {
  auth: null,
};

Signup.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default connect(({ auth }) => ({ auth }))(Signup);
