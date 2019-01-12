import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type, label, id, input, meta: { touched, error },
}) => (
  <div className="input-group">
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} {...input} className={touched && error ? 'has-error' : ''} />
    {touched && error && <span className="error">{error}</span>}
  </div>
);

Input.defaultProps = {
  type: '',
  id: '',
  input: {},
  label: '',
  meta: {},
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.oneOfType([PropTypes.object]),
  meta: PropTypes.oneOfType([PropTypes.object]),
};

export default Input;
