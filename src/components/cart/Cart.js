import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatPrice, fakeNetworkDelay } from '../../utils';
import './Cart.scss';
import CartItem from './CartItem';
import { getCartItems } from '../../actions/cart';
import Processing from '../presentation/Processing';

class Cart extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const { getCartItems: fetchCartItems } = this.props;
    await fetchCartItems();
    fakeNetworkDelay(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    const { cartItems, isLoggedIn, location } = this.props;
    const allCartItems = Object.keys(cartItems);
    const cartCount = allCartItems.length;

    let redirectTo = null;
    if (!isLoggedIn) {
      redirectTo = {
        pathname: '/login',
        state: { from: location },
      };
    } else {
      redirectTo = '/checkout';
    }
    if (loading) return <Processing processing />;

    return (
      <div className="carts">
        <div className="cart-items">
          <h2 className="text-center">
            {`Cart (${cartCount <= 1 ? `${cartCount} item` : `${cartCount} items`})`}
          </h2>
          {allCartItems.map((key) => {
            const cart = cartItems[key];
            return <CartItem key={key} cart={cart} />;
          })}
        </div>

        <div className="sum-total">
          <p>
            Total:
            <span>
              {` $${formatPrice(
                allCartItems
                  .map((key) => {
                    const cart = cartItems[key];
                    return cart.qty * cart.price;
                  })
                  .reduce((acc, curr) => acc + curr, 0),
              )}`}
            </span>
          </p>
        </div>
        <div className="cart-action-btns">
          <Link className="btn btn-default" to="/">
            Continue shopping
          </Link>
          <Link className="btn btn-danger" to={redirectTo}>
            Proceed to checkout
          </Link>
        </div>
      </div>
    );
  }
}

Cart.defaultProps = {
  getCartItems: null,
  cartItems: {},
  isLoggedIn: null,
  location: null,
};

Cart.propTypes = {
  getCartItems: PropTypes.func,
  cartItems: PropTypes.oneOfType([PropTypes.object]),
  isLoggedIn: PropTypes.bool,
  location: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ cart, auth }) => ({
  cartItems: cart.items,
  isLoggedIn: auth.isLoggedIn,
});

export default connect(
  mapStateToProps,
  { getCartItems },
)(Cart);
