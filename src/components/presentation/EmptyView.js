import React from 'react';
import PropTypes from 'prop-types';
import './EmptyView.scss';

const EmptyView = ({ children }) => (
  <div className="empty-view">
    { children }
  </div>
);

EmptyView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EmptyView;
