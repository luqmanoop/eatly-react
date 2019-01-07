import React, { Component } from 'react';
import LoginForm from '../container/LoginForm';

class Login extends Component {
  handleLogin = values => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default Login;
