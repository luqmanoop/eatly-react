import React, { Component } from 'react';
import propTypes from 'prop-types';

class ErrorBoundary extends Component {
  state = { error: null, info: null };

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const {
      state: { error, info },
      props: { children },
    } = this;
    if (info && error) {
      return <div>something went wrong</div>;
    }
    return children;
  }
}

ErrorBoundary.defaultProps = {
  children: {},
};

ErrorBoundary.propTypes = {
  children: propTypes.oneOfType([propTypes.object]),
};

export default ErrorBoundary;
