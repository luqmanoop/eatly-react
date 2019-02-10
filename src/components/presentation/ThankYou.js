import React from 'react';
import { Link } from 'react-router-dom';
import orderSuccessful from '../../assets/images/order-confirmed.svg';
import './ThankYou.scss';

const ThankYou = () => (
  <div className="thank-you">
    <p className="title">Thank you</p>
    <img src={orderSuccessful} alt="purchase successful" />
    <p>
    Your order was successfully.
    </p>
    <p>
      {'View '}
      <Link to="/order/history">order history</Link>
      {' or '}
      <Link to="/">go back</Link>
      {' to homepage.'}
    </p>
  </div>
);

export default ThankYou;
