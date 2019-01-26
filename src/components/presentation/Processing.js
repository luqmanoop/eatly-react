import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const Processing = ({ children, processing }) => (
  <div className="loading show">
    { processing && <Spinner />}
    {children}
  </div>
);

Processing.defaultProps = {
  processing: false,
  children: null,
};

Processing.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]), // https://stackoverflow.com/a/42122662
  processing: PropTypes.bool,
};

export default Processing;
