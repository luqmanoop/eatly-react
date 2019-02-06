import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../assets/images/dish-white.svg';
import cartIcon from '../../assets/images/shopping_cart.svg';
import { logoutUser } from '../../actions/auth';

const Navbar = ({ auth, logoutUser: logout, cartCount }) => (
  <header className="header">
    <nav className="container">
      <ul className="links">
        <span className="brand-wrap">
          <Link to="/" className="link brand">
            <img src={logo} alt="Eatly logo" />
          </Link>
        </span>
        <div className="link-group">
          <Link to="/cart" className="link cart">
            <img src={cartIcon} className="btn cart-icon" alt="cart icon" />
            <span className="cart-counter">{cartCount}</span>
          </Link>
          {auth.user ? (
            <Fragment>
              <li className="link">
                <Link to="/order/history">My orders</Link>
              </li>
              <li className="link">
                <button onClick={logout}>Logout</button>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="link">
                <Link to="/login">Log in</Link>
              </li>
              <li className="link">
                <Link to="/register">Sign up</Link>
              </li>
            </Fragment>
          )}
        </div>
      </ul>
    </nav>
  </header>
);

Navbar.defaultProps = {
  auth: null,
  logoutUser: null,
  cartCount: 0,
};

Navbar.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  logoutUser: PropTypes.func,
  cartCount: PropTypes.number,
};

const mapStateToProps = ({ auth, cart }) => ({ auth, cartCount: cart.count });
export default connect(
  mapStateToProps,
  { logoutUser },
)(Navbar);
