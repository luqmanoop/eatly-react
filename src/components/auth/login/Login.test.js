import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, wait } from 'react-testing-library';
import { renderWithRedux } from '../../../utils/index';
import axios from '../../../utils/axiosInstance';
import Login from './Login';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

describe('Submit login form', () => {
  let component;
  let emailField;
  let passwordField;
  let submitButton;

  beforeEach(() => {
    component = renderWithRedux(<Login />);
    const { container, getByLabelText } = component;
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
    const error = { message: 'Invalid username/password combination' };
    await axiosMock.onPost().reply(500, error);
    fillSubmitForm();

    await wait(() => expect(component.getByText(error.message)).toBeInTheDocument());
    expect(component.getByText(error.message)).toBeInTheDocument();
  });
});
