import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';
import { renderWithRedux } from '../../utils';

describe('<OrderHistoryItem />', () => {
  test('it renders', () => {
    const order = {
      id: 1,
      menu: {
        name: 'jollof rice',
        price: 500,
      },
      qty: 2,
      status: 'Processing',
    };

    const { getByText } = renderWithRedux(<OrderHistoryItem order={order} />);
    expect(getByText(/jollof rice/i)).toBeInTheDocument();
    expect(getByText(/\$500.00 x 2/)).toBeInTheDocument();
    expect(getByText(/\$1,000.00/)).toBeInTheDocument();
  });
});
