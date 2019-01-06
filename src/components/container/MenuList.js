import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllMenu } from '../../actions/index';
import Menu from '../presentation/Menu';

class MenuList extends Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    await this.props.getAllMenu();
    this.setState({ loading: false });
  }

  render() {
    const {
      state: { loading },
      props: { allMenu }
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

const mapStateToProps = ({ allMenu }) => ({ allMenu });

export default connect(
  mapStateToProps,
  { getAllMenu }
)(MenuList);
