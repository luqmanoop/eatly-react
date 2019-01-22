import React, { Component } from 'react';
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

  render() {
    const { menu } = this.props;
    const {
      id, name, imgurl, price,
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
          <Link className="btn btn-default" to={`/order/${slugify(name, { lower: true })}?id=${id}`}>
            Buy now
          </Link>
          <Button handleClick={() => this.addToCart(menu)} classes="btn-default" title="Add item" />
        </div>
      </section>
    );
  }
}

Menu.defaultProps = {
  menu: {},
  dispatchAddToCart: null,
};

Menu.propTypes = {
  menu: PropTypes.oneOfType([PropTypes.object]),
  dispatchAddToCart: PropTypes.func,
};

export default connect(
  null,
  { dispatchAddToCart: addToCart },
)(Menu);
