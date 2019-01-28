import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { waitForDomChange, fireEvent } from 'react-testing-library';
import axios from '../../utils/axiosInstance';
import OrderHistory from './OrderHistory';
import { renderWithRedux } from '../../utils';

const axiosMock = new MockAdapter(axios, {
  delayResponse: 500,
});
const history = createMemoryHistory({ initialEntries: ['/order/history'] });
history.push = jest.fn();

describe('<OrderHistory />', () => {
  const ui = (
    <Router history={history}>
      <OrderHistory />
    </Router>
  );
  test('renders empty string when determinig log in status', async () => {
    const { container } = renderWithRedux(ui);
    expect(container.innerHTML).toBe('');
  });

  test('display order history when logged in', async () => {
    const payload = [{
      id: 1, qty: 2, status: 'New', menu: { name: 'jollof', price: 200 },
    }];

    axiosMock.onGet().replyOnce(200, payload);
    const { container, getByText } = renderWithRedux(ui,
      { initialState: { auth: { user: { id: 1 }, isLoggedIn: true } } });
    await waitForDomChange({ container });
    expect(getByText(/\$400.00/i)).toBeInTheDocument();
  });

  test('fails to cancel order', async () => {
    const payload = [{
      id: '', qty: 2, status: 'New', menu: { name: 'jollof', price: 200 },
    }];

    axiosMock.onGet().replyOnce(200, payload);
    const { container, getByText } = renderWithRedux(ui,
      { initialState: { auth: { user: { id: 1 }, isLoggedIn: true } } });

    await waitForDomChange({ container });
    const cancelOrderBtn = getByText(/cancel order/i);
    fireEvent.click(cancelOrderBtn);
  });

  test('cancels an order', async () => {
    const payload = [{
      id: 1, qty: 2, status: 'New', menu: { name: 'jollof', price: 200 },
    }];

    axiosMock.onGet().replyOnce(200, payload);
    const { container, getByText } = renderWithRedux(ui,
      { initialState: { auth: { user: { id: 1 }, isLoggedIn: true } } });

    await waitForDomChange({ container });

    const cancelOrderBtn = getByText(/cancel order/i);

    axiosMock.onDelete().replyOnce(200);
    expect(cancelOrderBtn).toBeInTheDocument();
    fireEvent.click(cancelOrderBtn);

    await waitForDomChange({ container });
    expect(cancelOrderBtn).not.toBeInTheDocument();
  });
});
