import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import Button from '../presentation/Button';
import { addToCart } from '../../actions/cart';
import { deleteMenu } from '../../actions/menu';
import Modal from '../presentation/Modal';

class Menu extends Component {
  state = {
    modal: {
      show: false,
      title: 'Delete menu?',
      message: 'This will permanently remove menu from database',
      positiveTitle: 'Confirm',
      negativeTitle: 'Back',
      onNegativeClick: () => this.closeModal(),
      onPositiveClick: () => this.handleDeleteMenu(),
    },
  }

  closeModal = () => {
    const { modal: modalConfig } = this.state;
    this.setState({ modal: { ...modalConfig, show: false } });
  }

  showModal = () => {
    const { modal: modalConfig } = this.state;
    this.setState({ modal: { ...modalConfig, show: true } });
  }

  addToCart = (menu) => {
    const { dispatchAddToCart } = this.props;
    dispatchAddToCart(menu);
  };

  handleDeleteMenu = async () => {
    const { dispatchDeleteMenu, menu: { id } } = this.props;
    await dispatchDeleteMenu(parseInt(id, 10));
    this.closeModal();
  }

  renderButtons = () => {
    const { user, menu } = this.props;
    const { modal } = this.state;
    const { name, id } = menu;

    if (user && user.is_admin) {
      return (
        <Fragment>
          { modal.show && <Modal config={modal} />}
          <Link className="btn btn-default" to={`/menu/edit?name=${slugify(name, { lower: true })}&id=${id}`}>
            Edit
          </Link>
          <Button handleClick={() => this.showModal()} classes="btn-default" title="Delete" />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Link className="btn btn-default" to={`/order/${slugify(name, { lower: true })}?id=${id}`}>
            Buy now
        </Link>
        <Button handleClick={() => this.addToCart(menu)} classes="btn-default" title="Add item" />
      </Fragment>
    );
  }

  render() {
    const { menu } = this.props;
    const {
      name, imgurl, price,
    } = menu;
    return (
      <section data-testid="menu" className="menu">
        <div className="menu__img">
          <img src={imgurl} alt={name} />
        </div>
        <h3 title={name} className="menu__name">
          {name}
        </h3>
        <h4 className="menu__price">{`$${price}`}</h4>
        <div className="menu__btns">
          { this.renderButtons() }
        </div>
      </section>
    );
  }
}

Menu.defaultProps = {
  menu: {},
  dispatchAddToCart: null,
  dispatchDeleteMenu: null,
  user: null,
};

Menu.propTypes = {
  menu: PropTypes.oneOfType([PropTypes.object]),
  dispatchAddToCart: PropTypes.func,
  dispatchDeleteMenu: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {
    dispatchAddToCart: addToCart,
    dispatchDeleteMenu: deleteMenu,
  },
)(Menu);
