import React from 'react';

const Input = ({ type, id, input }) => {
  return <input id={id} type={type} {...input} className="" />;
};

export default Input;
