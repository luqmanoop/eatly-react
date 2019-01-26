import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import Button from '../presentation/Button';
import { addToCart } from '../../actions';

class Menu extends Component {
  addToCart = (menu) => {
    const { dispatchAddToCart } = this.props;
    dispatchAddToCart(menu);
  };

  renderButtons = () => {
    const { user, menu } = this.props;
    const { name, id } = menu;
    if (user && user.is_admin) {
      return (
        <Fragment>
          <Link className="btn btn-default" to={`/menu/edit?name=${slugify(name, { lower: true })}&id=${id}`}>
            Edit
          </Link>
          <Button handleClick={() => {}} classes="btn-default" title="Delete" />
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
  user: null,
};

Menu.propTypes = {
  menu: PropTypes.oneOfType([PropTypes.object]),
  dispatchAddToCart: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  { dispatchAddToCart: addToCart },
)(Menu);
