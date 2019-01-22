import React from 'react';
import { fireEvent } from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Menu from './Menu';
import { renderWithRedux } from '../../utils';

describe('<Menu />', () => {
  const props = {
    name: 'rice',
    imgurl: 'https://pix.io/rice.jpg',
    price: 300,
  };

  let component = {};
  const history = createMemoryHistory({ initialEntries: ['/'] });
  beforeEach(() => {
    const ui = <Router history={history}><Menu menu={props} /></Router>;
    component = renderWithRedux(ui);
  });

  test('renders', () => {
    const { getByTestId, getByText, container } = component;
    expect(getByTestId('menu')).toBeInTheDocument();
    expect(getByText(/rice/i)).toBeInTheDocument();
  });

  test('receives props and render children', () => {
    const { price, name, imgurl } = props;
    const { container, getByAltText } = component;

    expect(container.querySelector('.menu__name')).toHaveTextContent(name);
    expect(container.querySelector('.menu__price')).toHaveTextContent(price);
    expect(container.querySelector('.menu__img>img')).toHaveAttribute('src', imgurl);
    expect(getByAltText(name)).toBeInTheDocument();
  });

  test('renders composite component', () => {
    const { container } = component;
    expect(container.querySelectorAll('.btn-default').length).toBe(2);
  });

  test('add to cart', () => {
    const { getByText } = component;
    fireEvent.click(getByText(/add item/i));
  });
});
