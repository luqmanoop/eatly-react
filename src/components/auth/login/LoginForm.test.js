import React from 'react';
import { renderWithRedux } from '../../../utils';

import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  test('renders properly', () => {
    const { container, getByLabelText } = renderWithRedux(<LoginForm />);
    const loginButton = container.querySelector('button[type=submit]');

    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.textContent).toBe('Login');
  });
});
