import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const Login = ({ user, location }) => {
  const { from } = location.state || { from: { pathname: '/' } };
  return <div>{!user ? <LoginForm /> : <Redirect to={from} />}</div>;
};

Login.defaultProps = {
  user: {},
  location: {},
};

Login.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  location: PropTypes.oneOfType([PropTypes.object]),
};

export default withRouter(connect(({ auth }) => ({ user: auth.user || null }))(Login));
