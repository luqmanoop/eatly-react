import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import axios from '../../utils/axiosInstance';
import AppRouter from './index';
import { renderWithRedux } from '../../utils';

const axiosMock = new MockAdapter(axios, {
  delayResponse: 500,
});

describe('AppRouter', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);
  const history = createMemoryHistory({ initialEntries: ['/', '/login'] });
  const ui = (
    <Router history={history}>
      <AppRouter />
    </Router>
  );

  test('renders properly', async () => {
    axiosMock.onGet('/users/me').replyOnce(200, { id: 1 });
    const { getByText, container } = renderWithRedux(ui,
      { initialState: { auth: { user: { id: 1 }, isLoggedIn: true } } });
    const logoutButton = getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    await waitForDomChange({ container });
  });
});
