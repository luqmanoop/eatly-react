import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Navbar from '../presentation/Navbar';
import Login from '../auth/login/Login';
import Signup from '../auth/signup/Signup';

const NoMatch = () => <div>404 not found</div>;

const AppRouter = () => (
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

export default AppRouter;
