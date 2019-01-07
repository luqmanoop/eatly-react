import React from 'react';
import propType from 'prop-types';
const Button = props => {
  const classNames = `btn ${props.classes}`;
  return (
    <button className={classNames} type={props.type}>
      {props.title}
    </button>
  );
};

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  type: propType.string,
  title: propType.string.isRequired
};

export default Button;
