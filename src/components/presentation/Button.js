import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    title, classes, type, handleClick, disabled,
  } = props;
  const classNames = `btn ${classes}`;
  return (
    <button disabled={disabled} onClick={handleClick} type={type} className={classNames}>
      {title}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  classes: '',
  handleClick: () => {},
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  title: PropTypes.string.isRequired,
  classes: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
