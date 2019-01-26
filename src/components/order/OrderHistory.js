import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { getUserOrders } from '../../actions';
import '../../assets/sass/order.scss';
import OrderHistoryItem from './OrderHistoryItem';
import { fakeNetworkDelay } from '../../utils';
import Processing from '../presentation/Processing';

class OrderHistory extends Component {
    state = {
      isLoading: true,
    }

    componentDidMount() {
      const { userId } = this.props;
      if (userId) {
        this.getOrders(userId);
      }
    }

    componentDidUpdate(prevProps) {
      const { userId, isLoggedIn } = this.props;
      if (userId !== prevProps.userId && isLoggedIn) {
        this.getOrders(userId);
      }
    }

    getOrders = async (userId) => {
      const { getUserOrders: dispatchGetUserOrders } = this.props;
      await dispatchGetUserOrders(userId);
      await fakeNetworkDelay(() => {
        this.setState({ isLoading: false });
      });
    }

    renderOrders = () => {
      const { isLoading } = this.state;
      const { orders } = this.props;

      if (isLoading) return <Processing processing />;
      return (
        <div>
          <div className="sub-title highlights">
            <span className="highlight new">new</span>
            <span className="highlight processing">processing</span>
            <span className="highlight complete">complete</span>
            <span className="highlight cancelled">cancelled</span>
          </div>
          <article className="orders">
            { orders.map(order => <OrderHistoryItem key={order.id} order={order} />)}
          </article>
        </div>
      );
    }

    render() {
      const { isLoggedIn, location } = this.props;
      if (typeof isLoggedIn !== 'boolean') return null;
      if (isLoggedIn === false) return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      return this.renderOrders();
    }
}

OrderHistory.defaultProps = {
  orders: [],
  getUserOrders: null,
  userId: null,
  isLoggedIn: null,
  location: null,
};

OrderHistory.propTypes = {
  orders: PropTypes.oneOfType([PropTypes.array]),
  getUserOrders: PropTypes.func,
  userId: PropTypes.number,
  isLoggedIn: PropTypes.bool,
  location: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = (state) => {
  const { orders, auth: { user, isLoggedIn } } = state;
  return { orders: orders.all, userId: user ? user.id : null, isLoggedIn };
};

export default withRouter(connect(mapStateToProps, { getUserOrders })(OrderHistory));
