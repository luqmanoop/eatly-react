import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Menu from './Menu';
import { renderWithRedux } from '../../utils';

describe('<Menu />', () => {
  const props = {
    name: 'rice',
    imgurl: 'https://pix.io/rice.jpg',
    price: 300,
  };

  let component = {};

  beforeEach(() => {
    component = renderWithRedux(<Menu menu={props} />);
  });

  test('renders', () => {
    const { getByTestId } = component;
    expect(getByTestId('menu')).toBeInTheDocument();
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
    expect(container.querySelectorAll('button.btn.btn-default').length).toBe(2);
  });

  test('add to cart', () => {
    const { getByText } = component;
    fireEvent.click(getByText(/add item/i));
  });
});
