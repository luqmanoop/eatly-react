import React from 'react';
import propType from 'prop-types';

const Button = ({ title, classes, type }) => {
  const classNames = `btn ${classes}`;
  return (
    <button type={type} className={classNames}>
      {title}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  classes: '',
};

Button.propTypes = {
  type: propType.oneOf(['submit', 'button']),
  title: propType.string.isRequired,
  classes: propType.string,
};

export default Button;
