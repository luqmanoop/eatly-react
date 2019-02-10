import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { waitForDomChange, cleanup, fireEvent } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../utils/axiosInstance';
import { renderWithRedux } from '../../utils';
import cartUtils from '../../utils/cart';
import Cart from './Cart';

const axiosMock = new MockAdapter(axios, { delayResponse: 100 });
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
  });

  test('it should confirm order & make payment', async () => {
    const { getByText, container } = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: true } } });
    await waitForDomChange({ container });
    axiosMock.onPost().replyOnce(200);
    fireEvent.click(getByText(/confirm & pay/i));
    await waitForDomChange({ container });
  });

  test('it should fail to place order for items in cart', async () => {
    const { getByText, container } = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: true } } });
    await waitForDomChange({ container });
    axiosMock.onPost().replyOnce(500);
    fireEvent.click(getByText(/confirm & pay/i));
    await waitForDomChange({ container });
  });
});
