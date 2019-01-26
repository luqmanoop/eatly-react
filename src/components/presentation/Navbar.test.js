import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from 'react-testing-library';
import Navbar from './Navbar';
import { renderWithRedux } from '../../utils';

const history = createMemoryHistory({ initialEntries: ['/order/jollof-rice?id=2'] });
history.push = jest.fn();

describe('Navbar', () => {
  const ui = (
    <Router history={history}>
      <Navbar />
    </Router>
  );
  test('show login/signup link when not authenticated', () => {
    const { getByText } = renderWithRedux(ui);
    expect(getByText(/log in/i)).toBeInTheDocument();
    expect(getByText(/sign up/i)).toBeInTheDocument();
  });

  test('show logout when authenticated', () => {
    const { getByText } = renderWithRedux(ui, { initialState: { auth: { user: { id: 1 } } } });
    expect(getByText(/logout/i)).toBeInTheDocument();
  });
});
