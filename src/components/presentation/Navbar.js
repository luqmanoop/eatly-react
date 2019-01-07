import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/dish-white.svg';

const Navbar = () => {
  return (
    <header className="header">
      <nav className="container">
        <ul className="links">
          <Link to="/" className="link brand">
            <img src={logo} alt="Eatly logo" />
          </Link>
          <li className="link">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
