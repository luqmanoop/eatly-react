import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import App from '../App';
import Navbar from '../presentation/Navbar';
import Login from '../auth/login/Login';
import Signup from '../auth/signup/Signup';
import { getCurrentUser } from '../../actions';

const NoMatch = () => <div>404 not found</div>;

class AppRouter extends Component {
  componentDidMount() {
    const { getCurrentUser: dispatchGetCurrentUser } = this.props;
    dispatchGetCurrentUser();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <main className="main">
            <Switch>
              <Route path="/" exact component={App} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Signup} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </Fragment>
      </Router>
    );
  }
}

AppRouter.defaultProps = {
  getCurrentUser: () => {},
};

AppRouter.propTypes = {
  getCurrentUser: PropTypes.func,
};

export default connect(
  null,
  { getCurrentUser },
)(AppRouter);
