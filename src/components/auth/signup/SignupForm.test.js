import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import SignupForm from './SignupForm';
import { renderWithRedux } from '../../../utils';
import axios from '../../../utils/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 100 });

describe('SignupForm component', () => {
  let component;
  let fullNameField;
  let emailField;
  let passwordField;
  let confirmPasswordField;
  let submitButton;
  beforeEach(() => {
    component = renderWithRedux(<SignupForm />);
    const { getByLabelText, container } = component;
    fullNameField = getByLabelText('Full name');
    emailField = getByLabelText('Email');
    passwordField = getByLabelText('Password');
    confirmPasswordField = getByLabelText('Confirm password');
    submitButton = container.querySelector('button[type=submit]');
  });
  afterEach(axiosMock.restore);
  const fillForm = () => {
    fireEvent.change(emailField, { target: { value: 'john@mail.com' } });
    fireEvent.change(fullNameField, { target: { value: 'john doe' } });
    fireEvent.change(passwordField, { target: { value: 'internet' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'internet' } });
  };

  test('it renders form labels & inputs', () => {
    expect(fullNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();
    expect(submitButton.textContent).toBe('Sign up');
  });

  test('it fail to register a user', async () => {
    const { getByText, container } = component;
    expect(container.querySelector('span.form-error')).not.toBeInTheDocument();
    await axiosMock.onPost().replyOnce(500, { message: 'signup failed' });

    fillForm();
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await wait(() => expect(getByText('signup failed')).toBeInTheDocument());
    expect(container.querySelector('span.form-error')).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});
