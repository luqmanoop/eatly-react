import React from 'react';

const Button = props => {
  const classNames = `btn ${props.classes}`;
  return (
    <button className={classNames} type="button">
      {props.title}
    </button>
  );
};

export default Button;
