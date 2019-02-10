import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import './CartItem.scss';

const CartItem = ({ cart }) => {
  const {
    name, qty, price, imgurl,
  } = cart || {};
  return (
    <div className="cart-item">
      <div className="meta">
        <p className="name">{name}</p>
        <p className="price-n-qty">{`$${price} x ${qty}`}</p>
        <p className="total">
          {'Subtotal: '}
          <span>{`$${formatPrice(price * qty)}`}</span>
        </p>
      </div>
      <img src={imgurl} alt={name} />
    </div>
  );
};

CartItem.propTypes = {
  cart: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default CartItem;
