import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

const Demo = () => <div>demo component</div>;

describe('Test react component', () => {
  test('DemoComponent', () => {
    const { getByText } = render(<Demo />);
    expect(getByText('demo component')).toBeInTheDocument();
  });
});
