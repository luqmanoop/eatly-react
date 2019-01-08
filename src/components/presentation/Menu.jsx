import React from 'react';
import propTypes from 'prop-types';
import Button from './Button';

const Menu = (props) => {
  const {
    menu: { name, imgurl, price },
  } = props;

  return (
    <section data-testid="menu" className="menu">
      <div className="menu__img">
        <img src={imgurl} alt={name} />
      </div>
      <h3 title={name} className="menu__name">
        {name}
      </h3>
      <h4 className="menu__price">{price}</h4>
      <div className="menu__btns">
        <Button classes="btn-default" title="Buy now" />
        <Button classes="btn-default" title="Add item" />
      </div>
    </section>
  );
};

Menu.defaultProps = {
  menu: {},
};

Menu.propTypes = {
  menu: propTypes.oneOfType([propTypes.object]),
};

export default Menu;
