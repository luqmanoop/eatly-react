import React from 'react';
import EmptyView from './EmptyView';
import notFound from '../../assets/images/404.svg';

const NotFound = () => (
  <EmptyView>
    <img src={notFound} alt="page not found" />
    <p className="title">Page not found</p>
  </EmptyView>
);

export default NotFound;
