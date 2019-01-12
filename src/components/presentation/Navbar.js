import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../assets/images/dish-white.svg';
import { logoutUser } from '../../actions';

const Navbar = ({ auth, logoutUser: logout }) => (
  <header className="header">
    <nav className="container">
      <ul className="links">
        <Link to="/" className="link brand">
          <img src={logo} alt="Eatly logo" />
        </Link>
        {auth.user ? (
          <Fragment>
            <li className="link">
              <button onClick={logout}>Logout</button>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="link">
              <Link to="/login">Login</Link>
            </li>
            <li className="link">
              <Link to="/register">Sign up</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  </header>
);

Navbar.defaultProps = {
  auth: null,
  logoutUser: () => {},
};

Navbar.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  logoutUser: PropTypes.func,
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(
  mapStateToProps,
  { logoutUser },
)(Navbar);
