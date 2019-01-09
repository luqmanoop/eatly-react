import React from 'react';
import SignupForm from './SignupForm';
import { renderWithRedux } from '../../../utils';

test('it renders', () => {
  const { getByLabelText, container } = renderWithRedux(<SignupForm />);

  expect(getByLabelText('Full name')).toBeInTheDocument();
  expect(getByLabelText('Email')).toBeInTheDocument();
  expect(getByLabelText('Password')).toBeInTheDocument();
  expect(getByLabelText(/Confirm password/)).toBeInTheDocument();
  expect(container.querySelector('button[type=submit]').textContent).toBe('Sign up');
});
