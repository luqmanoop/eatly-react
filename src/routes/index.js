import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '../components/App';

const About = () => (
  <Fragment>
    <h1>Stark Foods</h1>
    <p>Stark Foods is a food service delivery app</p>
  </Fragment>
);

const AppRouter = () => (
  <Router>
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={App} />
      <Route path="/about" component={About} />
    </Fragment>
  </Router>
);

export default AppRouter;
