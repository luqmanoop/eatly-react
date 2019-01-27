import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllMenu } from '../../actions/index';
import Menu from './Menu';

class MenuList extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const { getAllMenu: fetchAllMenu } = this.props;
    await fetchAllMenu();
    this.setState({ loading: false });
  }

  render() {
    const {
      state: { loading },
      props: { allMenu, user },
    } = this;
    return (
      <div className="restaurant-menu">
        {loading ? (
          <div data-testid="loading" className="center">
            loading...
          </div>
        ) : (
          allMenu.map(menu => <Menu key={menu.id} menu={menu} />)
        )}
        { user && user.is_admin && <Link className="fab" to="/menu/new">&#43;</Link> }
      </div>
    );
  }
}

MenuList.defaultProps = {
  getAllMenu: null,
  allMenu: [],
  user: null,
};

MenuList.propTypes = {
  getAllMenu: PropTypes.func,
  allMenu: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ menu, auth }) => (
  {
    allMenu: menu.all,
    user: auth.user,
  }
);

export default connect(
  mapStateToProps,
  { getAllMenu },
)(MenuList);
