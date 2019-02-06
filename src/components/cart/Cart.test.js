import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { waitForDomChange, cleanup } from 'react-testing-library';
import { renderWithRedux } from '../../utils';
import cartUtils from '../../utils/cart';
import Cart from './Cart';

cartUtils.getCart = jest.fn().mockImplementation(() => ({
  3: {
    id: 3,
    imgurl: 'mock image',
    name: 'mock name',
    price: 139,
    qty: 1,
  },
}));

const history = createMemoryHistory({ initialEntries: ['/cart'] });
describe('<Cart />', () => {
  const ui = (
    <Router history={history}>
      <Cart />
    </Router>
  );
  test('it renders and show loading', () => {
    const { getByTestId } = renderWithRedux(ui);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('it gets cart items and display on screen', async () => {
    const { queryByTestId, getByText, container } = renderWithRedux(ui);
    await waitForDomChange({ container });
    expect(queryByTestId('spinner')).not.toBeInTheDocument();
    expect(getByText(/mock name/i)).toBeInTheDocument();

    cleanup();

    renderWithRedux(ui, { initialState: { auth: { isLoggedIn: true } } });
  });
});
