import React from 'react';
import propTypes from 'prop-types';

const Input = ({ type, id, input }) => <input id={id} type={type} {...input} className="" />;

Input.defaultProps = {
  type: '',
  id: '',
  input: {},
};

Input.propTypes = {
  type: propTypes.string,
  id: propTypes.string,
  input: propTypes.oneOfType([propTypes.object]),
};

export default Input;
