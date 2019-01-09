import React, { Component } from 'react';
import LoginForm from './LoginForm';

class Login extends Component {
  handleLogin = () => {};

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default Login;
