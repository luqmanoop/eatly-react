import React from 'react';
import { wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../utils/axiosInstance';
import MenuList from './MenuList';
import { renderWithRedux } from '../../utils';

const axiosMock = new MockAdapter(axios, {
  delayResponse: Math.random() * 100,
});

afterAll(axiosMock.restore);

test('list', async () => {
  await axiosMock.onGet('/menu').replyOnce(200, [
    {
      id: 1,
      name: 'rice',
      imgurl: 'https://pix.io/rice.jpg',
      price: 300,
    },
  ]);

  const { queryByTestId, container } = renderWithRedux(<MenuList />);
  const loadingElem = queryByTestId('loading');

  await wait(() => expect(loadingElem).not.toBeInTheDocument());
  expect(loadingElem).not.toBeInTheDocument();

  expect(container.children.length).toBe(1);
});
