import React from 'react';
import { wait } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../utils/axiosInstance';
import MenuList from './MenuList';
import { renderWithRedux } from '../../utils';

const axiosMock = new MockAdapter(axios, {
  delayResponse: Math.random() * 100,
});

describe('<MenuList />', () => {
  let component;
  let loadingElem;
  beforeEach(() => {
    component = renderWithRedux(<MenuList />);
    loadingElem = component.queryByTestId('loading');
  });
  afterAll(axiosMock.restore);

  test('should fetch and display restaurant menu', async () => {
    await axiosMock.onGet('/menu').replyOnce(200, [
      {
        id: 1,
        name: 'rice',
        imgurl: 'https://pix.io/rice.jpg',
        price: 300,
      },
    ]);

    const { container } = component;
    await wait(() => expect(loadingElem).not.toBeInTheDocument());
    expect(loadingElem).not.toBeInTheDocument();

    expect(container.children.length).toBe(1);
  });

  test('fail to fetch restaurant menu', async () => {
    await axiosMock.onGet().replyOnce(500);
    expect(loadingElem).toBeInTheDocument();
  });
});
