import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllMenu } from '../../actions/menu';
import Menu from './Menu';

class MenuList extends Component {
  componentDidMount() {
    this.props.getAllMenu(); // eslint-disable-line
  }

  render() {
    const {
      props: { allMenu, user },
    } = this;
    return (
      <div className="restaurant-menu">

        { allMenu.map(menu => <Menu key={menu.id} menu={menu} />)
        }
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
