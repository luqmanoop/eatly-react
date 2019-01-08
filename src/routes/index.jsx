import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import Navbar from '../components/presentation/Navbar';
import Login from '../components/presentation/Login';

const NoMatch = () => <div>404 not found</div>;

const AppRouter = () => (
  <Router>
    <Fragment>
      <Navbar />
      <main className="main">
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" exact component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </Fragment>
  </Router>
);

export default AppRouter;
