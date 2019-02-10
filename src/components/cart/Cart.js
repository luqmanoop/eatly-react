import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatPrice, fakeNetworkDelay } from '../../utils';
import './Cart.scss';
import cartEmpty from '../../assets/images/cart-empty.svg';
import CartItem from './CartItem';
import { getCartItems } from '../../actions/cart';
import { placeOrders } from '../../actions/order';
import Processing from '../presentation/Processing';
import Button from '../presentation/Button';
import EmptyView from '../presentation/EmptyView';
import ThankYou from '../presentation/ThankYou';

class Cart extends Component {
  state = {
    loading: true,
    orderSuccessful: false,
  };

  async componentDidMount() {
    const { getCartItems: fetchCartItems } = this.props;
    await fetchCartItems();
    fakeNetworkDelay(() => this.setState({ loading: false }));
  }

  onConfirmPayment = async () => {
    this.setState({ loading: true });
    const { cartItems, placeOrders: dispatchPlaceOrders } = this.props;
    const menuIds = Object.keys(cartItems);
    const orderData = menuIds.map(id => ({
      menu_id: id,
      qty: cartItems[id].qty,
    }));

    const orderSuccessful = await dispatchPlaceOrders(orderData);
    fakeNetworkDelay(() => {
      this.setState({ loading: false });
      if (orderSuccessful) {
        this.setState({ orderSuccessful });
      }
    });
  }

  calcSumTotal = () => {
    const { cartItems } = this.props;
    const allCartItems = Object.keys(cartItems);

    const sumTotal = allCartItems
      .map((key) => {
        const cart = cartItems[key];
        return cart.qty * cart.price;
      })
      .reduce((acc, curr) => acc + curr, 0);

    return sumTotal;
  };

  renderCheckoutButton = () => {
    const { isLoggedIn, location } = this.props;
    let redirectTo = null;
    if (!isLoggedIn) {
      redirectTo = {
        pathname: '/login',
        state: { from: location },
      };
    }

    const btnTitle = 'Confirm & Pay';

    return redirectTo ? (
      <Link className="btn btn-danger" to={redirectTo}>
        {btnTitle}
      </Link>
    ) : (
      <Button handleClick={this.onConfirmPayment} classes="btn btn-danger" title={btnTitle} />
    );
  };

  render() {
    const { loading, orderSuccessful } = this.state;
    const { cartItems } = this.props;
    const allCartItems = Object.keys(cartItems);
    const cartCount = allCartItems.length;

    if (loading) return <Processing processing />;
    if (!loading && orderSuccessful) {
      return <ThankYou />;
    }

    if (!cartCount && !loading) {
      return (
        <EmptyView>
          <img src={cartEmpty} alt="cart is empty" />
          <p className="title">It looks lonely here</p>
          <p>
            Looks like you&#39;ve not added any item to your shopping cart.
            Visit the homepage to add a menu
          </p>
          <Link to="/" className="btn btn-warning">Browse menu</Link>
        </EmptyView>
      );
    }


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
            <span>{` $${formatPrice(this.calcSumTotal())}`}</span>
          </p>
        </div>
        <div className="cart-action-btns">
          <Link className="btn btn-default" to="/">
            Back to menu
          </Link>
          {this.renderCheckoutButton()}
        </div>
      </div>
    );
  }
}

Cart.defaultProps = {
  getCartItems: null,
  placeOrders: null,
  cartItems: {},
  isLoggedIn: null,
  location: null,
};

Cart.propTypes = {
  getCartItems: PropTypes.func,
  placeOrders: PropTypes.func,
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
  { getCartItems, placeOrders },
)(Cart);
