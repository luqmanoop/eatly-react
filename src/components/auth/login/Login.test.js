import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, wait, waitForDomChange } from 'react-testing-library';
import { renderWithRedux } from '../../../utils/index';
import axios from '../../../utils/axiosInstance';
import AppRouter from '../../route';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const history = createMemoryHistory({ initialEntries: ['/login'] });
describe('Submit login form', () => {
  let component;
  let emailField;
  let passwordField;
  let submitButton;

  const ui = (
    <Router history={history}>
      <AppRouter />
    </Router>
  );

  beforeEach(() => {
    component = renderWithRedux(ui, { initialState: { auth: { user: null, isLogged: null } } });
    const { container, getByLabelText, getByText } = component;
    fireEvent.click(getByText(/log in/i));
    emailField = getByLabelText(/Email/i);
    passwordField = getByLabelText(/Password/i);
    submitButton = container.querySelector('button[type=submit]');
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  const fillSubmitForm = () => {
    fireEvent.change(emailField, { target: { value: 'johndoe@mail.com' } });
    fireEvent.change(passwordField, { target: { value: 'internet' } });
    fireEvent.submit(submitButton);
  };

  test('with valid credentials', async () => {
    const payload = { user: { id: 1 } };
    await axiosMock.onPost().reply(200, payload);
    fillSubmitForm();

    await waitForDomChange({ container: component.container });
  });

  test('with invalid credentials', async () => {
    const error = { message: 'Invalid username/password combination' };
    await axiosMock.onPost().reply(500, error);
    fillSubmitForm();

    await wait(() => expect(component.getByText(error.message)).toBeInTheDocument());
    expect(component.getByText(error.message)).toBeInTheDocument();
  });
});
