import React from 'react';
import Signup from './Signup';
import { renderWithRedux } from '../../../utils';

test('it renders <SignupForm />', () => {
  const { container } = renderWithRedux(<Signup />);
  expect(container.querySelector('form.signup')).toBeInTheDocument();
});
