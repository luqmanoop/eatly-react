import React from 'react';
import { render } from 'react-testing-library';
import Modal from './Modal';

test('should render w/ default negative button title', () => {
  const prop = { };
  const { getByText } = render(<Modal config={prop} />);
  expect(getByText(/cancel/i)).toBeInTheDocument();
});
