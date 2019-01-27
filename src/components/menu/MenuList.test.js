import React from 'react';
import { waitForDomChange, fireEvent } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import MenuList from './MenuList';
import { renderWithRedux } from '../../utils';

const axiosMock = new MockAdapter(axios, {
  delayResponse: 500,
});
const history = createMemoryHistory({ initialEntries: ['/'] });
describe('<MenuList />', () => {
  const withRouter = (
    <Router history={history}>
      <MenuList />
    </Router>
  );

  const successPayload = [
    {
      id: 1,
      name: 'rice',
      imgurl: 'https://pix.io/rice.jpg',
      price: 300,
    },
    {
      id: 2,
      name: 'jollof',
      imgurl: 'https://pix.io/rice.jpg',
      price: 999,
    },
  ];

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('should fetch and display restaurant menu', async () => {
    axiosMock.onGet().replyOnce(200, successPayload);
    const { container, getByText, getByTestId } = renderWithRedux(withRouter);
    const loadingElem = getByTestId('loading');
    expect(loadingElem).toBeInTheDocument();
    await waitForDomChange({ container });
    expect(getByText(/jollof/i)).toBeInTheDocument();
    expect(loadingElem).not.toBeInTheDocument();
  });

  test('fail to fetch restaurant menu', async () => {
    await axiosMock.onGet().replyOnce(500);
    const { queryByTestId, container } = renderWithRedux(withRouter);
    await waitForDomChange({ container });
    expect(queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('deletes a menu from list', async () => {
    axiosMock.onGet().replyOnce(200, successPayload);
    const { getByText, container } = renderWithRedux(withRouter,
      { initialState: { auth: { user: { is_admin: true } } } });
    await waitForDomChange({ container });
    expect(container.querySelectorAll('.menu').length).toBe(2);

    axiosMock.onDelete().replyOnce(200);

    fireEvent.click(getByText(/delete/i));
    fireEvent.click(getByText(/confirm/i));

    await waitForDomChange({ container });
    expect(container.querySelectorAll('.menu').length).toBe(1);
  });
});
