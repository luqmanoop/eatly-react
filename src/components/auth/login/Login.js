import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const Login = ({ user }) => <div>{!user ? <LoginForm /> : <Redirect to="/" />}</div>;

Login.defaultProps = {
  user: null,
};
Login.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
};
export default connect(({ auth }) => ({ user: auth.user || null }))(Login);
