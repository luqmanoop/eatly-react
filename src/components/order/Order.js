import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Link, withRouter } from 'react-router-dom';
import Button from '../presentation/Button';
import { placeOrder } from '../../actions/order';
import { getSelectedMenu } from '../../actions/menu';
import { fakeNetworkDelay } from '../../utils';
import Processing from '../presentation/Processing';

class Order extends Component {
  state = {
    isLoading: true,
    processing: null,
    successful: false,
  }

  async componentDidMount() {
    const { location, getSelectedMenu: dispatchGetSelectedMenu } = this.props;
    const menuId = parse(location.search).id || null;

    await dispatchGetSelectedMenu(menuId);
    await fakeNetworkDelay(() => this.setState({ isLoading: false }));
  }

  onPlaceOrder = async (menuId) => {
    const {
      user, location, placeOrder: dispatchPlaceOrder, history: { push },
    } = this.props;
    if (!user) return push('/login', { from: location });
    this.setState({ processing: true });

    const isOrdered = await dispatchPlaceOrder({ menu_id: menuId });

    await fakeNetworkDelay(() => {
      this.setState({ processing: false });
      this.setState({ successful: isOrdered });
    });

    return null;
  }

  renderMenu = () => {
    const { menu } = this.props;
    const { processing, successful, isLoading } = this.state;

    if (isLoading) {
      return (
        <Processing processing>
          <h3>Getting menu</h3>
          <p>please wait...</p>
        </Processing>
      );
    }

    if (!menu && !isLoading) return <h3>Menu not found</h3>;
    if (menu && processing === null) {
      return (
        <div>
          <h2>{menu.name}</h2>
          <h3>{menu.price}</h3>
          <div className="input-group">
            <Button
              handleClick={() => this.onPlaceOrder(menu.id)}
              classes="btn-danger"
              title="Confirm order"
            />
          </div>
        </div>
      );
    }

    if (processing) {
      return (
        <Processing processing>
          <h1>Placing your order</h1>
          <p>please wait...</p>
        </Processing>
      );
    }

    if (!processing && !successful) {
      return (
        <Processing>
          <h1>An error occurred while placing your order</h1>
          <p>
            Please try again later.
            {' '}
            <Link to="/">Go Back</Link>
          </p>
        </Processing>
      );
    }

    return (
      <Processing>
        <h1>Order placed successfully</h1>
        <p>
          Click
          {' '}
          <Link to="/order/history">here</Link>
          {' '}
          to view your order history.
        </p>
      </Processing>
    );
  }

  render() {
    return (
      <div>
        { this.renderMenu() }
      </div>
    );
  }
}

Order.defaultProps = {
  user: null,
  location: null,
  history: null,
  menu: null,
  getSelectedMenu: null,
  placeOrder: null,
};

Order.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  location: PropTypes.oneOfType([PropTypes.object]),
  history: PropTypes.oneOfType([PropTypes.object]),
  menu: PropTypes.oneOfType([PropTypes.object]),
  getSelectedMenu: PropTypes.func,
  placeOrder: PropTypes.func,
};

const mapStateToProps = ({ auth, menu }) => ({ user: auth.user || null, menu: menu.selected });

export default connect(mapStateToProps, { getSelectedMenu, placeOrder })(withRouter(Order));
