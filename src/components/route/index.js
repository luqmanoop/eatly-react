import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import App from '../App';
import Navbar from '../presentation/Navbar';
import Login from '../auth/login/Login';
import Signup from '../auth/signup/Signup';
import { getCurrentUser } from '../../actions/auth';
import { getCartItemsCount } from '../../actions/cart';
import Order from '../order/Order';
import OrderHistory from '../order/OrderHistory';
import AddEditMenu from '../menu/AddEditMenu';
import Cart from '../cart/Cart';
import NotFound from '../presentation/NotFound';

class AppRouter extends Component {
  componentDidMount() {
    const {
      getCurrentUser: dispatchGetCurrentUser,
      getCartItemsCount: dispatchGetCartItemsCount,
    } = this.props;

    dispatchGetCurrentUser();
    dispatchGetCartItemsCount();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <main className="main">
            <Switch>
              <Route path="/" exact component={App} />
              <Route path="/cart" component={Cart} />
              <Route path="/order/history" component={OrderHistory} />
              <Route path="/order/:menu" component={Order} />
              <Route path="/menu/new" component={AddEditMenu} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Signup} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </Fragment>
      </Router>
    );
  }
}

AppRouter.defaultProps = {
  getCurrentUser: null,
  getCartItemsCount: null,
};

AppRouter.propTypes = {
  getCurrentUser: PropTypes.func,
  getCartItemsCount: PropTypes.func,
};

export default connect(
  null,
  { getCurrentUser, getCartItemsCount },
)(AppRouter);
