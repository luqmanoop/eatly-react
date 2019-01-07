import React, { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
  state = { error: null, info: null };

  componentDidCatch(error, info) {
    this.setState({ error, info });
    console.log('right here');
    console.log(error, info);
  }
  render() {
    if (this.state.info) {
      return <div>something went wrong</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
