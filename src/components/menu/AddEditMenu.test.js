import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from 'react-testing-library';
import axios from '../../utils/axiosInstance';
import { renderWithRedux } from '../../utils';
import AppRouter from '../route';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const history = createMemoryHistory({ initialEntries: ['/'] });
describe('<AddEditMenu />', () => {
  const ui = (
    <Router history={history}>
      <AppRouter />
    </Router>
  );
  let component;
  beforeEach(() => {
    axiosMock.onGet().reply(200, { id: 1, is_admin: true });
    component = renderWithRedux(ui,
      { initialState: { auth: { user: { is_admin: true }, isLoggedIn: true } } });
  });
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  const fillForm = inputs => inputs.forEach((input) => {
    const [elem, value] = input;
    fireEvent.change(elem, { target: { value } });
  });
  test('navigate to /menu/new from homepage', () => {
    const { container, getByLabelText } = component;
    const fab = container.querySelector('a.fab');
    fireEvent.click(fab);

    expect(getByLabelText(/name/i)).toBeInTheDocument();
    expect(getByLabelText(/url/i)).toBeInTheDocument();
    expect(getByLabelText(/price/i)).toBeInTheDocument();
  });

  test('fill and submit form', () => {
    const {
      getByLabelText, container, getByText,
    } = component;

    const form = container.querySelector('form');
    const name = getByLabelText(/name/i);
    const url = getByLabelText(/url/i);
    const price = getByLabelText(/price/i);

    fillForm([[name, 'Jollof'], [url, 'http://io.io'], [price, 199]]);
    fireEvent.submit(form);

    expect(getByText(/price should start at 200/i)).toBeInTheDocument();

    axiosMock.onPost().replyOnce(201, true);
    axiosMock.onGet().replyOnce(200);
    fillForm([[price, 250]]);
    fireEvent.submit(form);
  });
});
