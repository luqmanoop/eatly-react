/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';

const OrderHistoryItem = ({
  order: {
    id, qty, status, menu,
  },
}) => (
  <section className="order" data-id={id}>
    <div className="order__detail">
      <div className="menu-n-status">
        <h2 className="order__detail-menu">
          {menu.name}
        </h2>
        <span className={`order-status ${status.toLowerCase()}`} title={`Status: ${status}`} />
      </div>
      <div className="qty-n-total">
        <p className="order__detail-qty">
          {`$${formatPrice(menu.price)} x ${qty}`}
        </p>
        <p className="order__detail-total">{`$${formatPrice(menu.price * qty)}`}</p>
      </div>
    </div>
  </section>
);

OrderHistoryItem.propTypes = {
  order: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OrderHistoryItem;
