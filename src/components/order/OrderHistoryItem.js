/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatPrice } from '../../utils';
import Button from '../presentation/Button';
import { cancelOrder } from '../../actions/order';

class OrderHistoryItem extends Component {
  onCancelOrder = async (id) => {
    const { disptachCancelOrder } = this.props;
    if (!id) return;
    await disptachCancelOrder(id);
  }

  render() {
    const {
      order: {
        id, qty, status, menu,
      },
    } = this.props;
    return (
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
          <Button handleClick={() => this.onCancelOrder(id)} classes="btn-default" title="cancel order" />
        </div>
      </section>
    );
  }
}

OrderHistoryItem.defaultProps = {
  disptachCancelOrder: null,
};

OrderHistoryItem.propTypes = {
  order: PropTypes.oneOfType([PropTypes.object]).isRequired,
  disptachCancelOrder: PropTypes.func,
};


export default connect(null, { disptachCancelOrder: cancelOrder })(OrderHistoryItem);
