import React from 'react';
import { waitForDomChange, fireEvent } from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../utils/axiosInstance';
import Order from './Order';
import { renderWithRedux } from '../../utils';

const axiosMock = new MockAdapter(axios, {
  delayResponse: 500,
});
const history = createMemoryHistory({ initialEntries: ['/order/jollof-rice?id=2'] });
history.push = jest.fn();

describe('<Order />', () => {
  let ui;
  const initialState = { initialState: { auth: { user: { id: 3 } } } };

  beforeEach(() => {
    ui = (
      <Router history={history}>
        <Order />
      </Router>
    );
  });
  afterEach(() => {
    history.push.mockReset();
    axiosMock.reset();
  });
  afterAll(axiosMock.restore);

  test('show loading when component first render', () => {
    const { getByText } = renderWithRedux(ui);
    expect(getByText(/getting menu/i)).toBeInTheDocument();
    expect(getByText(/please wait.../i)).toBeInTheDocument();
  });

  test('fails to get menu', async () => {
    axiosMock.onGet().replyOnce(500, null);
    const { getByText, container } = renderWithRedux(ui);
    await waitForDomChange({ container });
    expect(getByText(/menu not found/i)).toBeInTheDocument();
  });

  test('gets menu and display on page', async () => {
    axiosMock.onGet().replyOnce(200, { name: 'jollof', price: 999, id: 2 });
    const { container } = renderWithRedux(ui);
    await waitForDomChange({ container });
    const confirmOrderBtn = container.querySelector('button.btn');
    expect(confirmOrderBtn.textContent).toEqual('Confirm order');
    expect(confirmOrderBtn).toBeInTheDocument();
  });

  test('redirect to login when confirming order w/o auth', async () => {
    axiosMock.onGet().replyOnce(200, { name: 'jollof', price: 999, id: 2 });
    const { container } = renderWithRedux(ui);
    await waitForDomChange({ container });
    const confirmOrderBtn = container.querySelector('button.btn');

    fireEvent.click(confirmOrderBtn);
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  test('should fail to process order', async () => {
    axiosMock.onGet().replyOnce(200, { name: 'jollof', price: 999, id: 2 });
    const { container, getByText } = renderWithRedux(ui, initialState);

    await waitForDomChange({ container });
    const confirmOrderBtn = container.querySelector('button.btn');

    axiosMock.onPost().replyOnce(500);
    fireEvent.click(confirmOrderBtn);
    expect(getByText(/placing your order/i)).toBeInTheDocument();
    expect(history.push).toHaveBeenCalledTimes(0);

    await waitForDomChange({ container });
    expect(getByText(/An error occurred while placing your order/i)).toBeInTheDocument();
  });

  test('place order successfully', async () => {
    axiosMock.onGet().replyOnce(200, { name: 'jollof', price: 999, id: 2 });
    const { container, getByText } = renderWithRedux(ui, initialState);
    await waitForDomChange({ container });
    const confirmOrderBtn = container.querySelector('button.btn');

    axiosMock.onPost().replyOnce(200);
    fireEvent.click(confirmOrderBtn);
    expect(getByText(/placing your order/i)).toBeInTheDocument();
    expect(history.push).toHaveBeenCalledTimes(0);

    await waitForDomChange({ container });
    expect(getByText(/order placed successfully/i)).toBeInTheDocument();
  });
});
