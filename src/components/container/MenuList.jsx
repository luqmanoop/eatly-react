import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getAllMenu } from '../../actions/index';
import Menu from '../presentation/Menu';

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
      props: { allMenu },
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
      </div>
    );
  }
}

MenuList.defaultProps = {
  getAllMenu: () => {},
  allMenu: [],
};

MenuList.propTypes = {
  getAllMenu: propTypes.func,
  allMenu: propTypes.arrayOf(propTypes.string),
};

const mapStateToProps = ({ allMenu }) => ({ allMenu });

export default connect(
  mapStateToProps,
  { getAllMenu },
)(MenuList);
