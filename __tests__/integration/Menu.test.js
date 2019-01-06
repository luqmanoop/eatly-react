import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import Menu from '../../src/components/presentation/Menu';

describe('<Menu />', () => {
  const props = {
    name: 'rice',
    imgurl: 'https://pix.io/rice.jpg',
    price: 300
  };

  let renderResult = {};

  beforeEach(() => (renderResult = render(<Menu menu={props} />)));

  test('renders', () => {
    const { getByTestId } = render(<Menu menu={{}} />);
    expect(getByTestId('menu')).toBeInTheDocument();
  });

  test('receives props and render children', () => {
    const { price, name, imgurl } = props;
    const { container, getByAltText } = renderResult;

    expect(container.querySelector('.menu__name')).toHaveTextContent(name);
    expect(container.querySelector('.menu__price')).toHaveTextContent(price);
    expect(container.querySelector('.menu__img>img')).toHaveAttribute(
      'src',
      imgurl
    );
    expect(getByAltText(name)).toBeInTheDocument();
  });

  test('renders composite component', () => {
    const { container } = renderResult;
    expect(container.querySelectorAll('button.btn.btn-default').length).toBe(2);
  });
});
