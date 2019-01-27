import MockAdapter from 'axios-mock-adapter';
import {
  getAllMenu, signUp, getCurrentUser, logoutUser, login, placeOrder, getSelectedMenu,
} from '../src/actions';
import {
  GET_ALL_MENU, PLACE_ORDER, GET_SELECTED_MENU, AUTHENTICATE, ADD_MENU, DELETE_MENU,
} from '../src/actions/types';
import axios from '../src/utils/axiosInstance';
import authUtils from '../src/utils/auth';
import { addMenu, deleteMenu } from '../src/actions/menu';

const axiosMock = new MockAdapter(axios, { delayResponse: 100 });
const dispatch = jest.fn();

describe('Redux actions', () => {
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('getAllMenu', () => {
    test('should dispatch with payload', async () => {
      const payload = [
        {
          id: 1,
          name: 'fufu',
          price: 200,
        },
      ];
      axiosMock.onGet('/menu').replyOnce(200, payload);

      await getAllMenu()(dispatch);
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_ALL_MENU, payload });
    });
    test('dispatch with empty data', async () => {
      axiosMock.onGet('/menu').replyOnce(500);

      await getAllMenu()(dispatch);
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_ALL_MENU, payload: [] });
    });
  });

  test('getCurrentUser pass', async () => {
    await axiosMock.onGet().replyOnce(200, {});
    await getCurrentUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: AUTHENTICATE, payload: { user: { } } });
  });

  test('getCurrentUser fails', async () => {
    await axiosMock.onGet().replyOnce(500);
    await getCurrentUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: AUTHENTICATE });
  });

  describe('signUp()', () => {
    const payload = { user: { id: 1, email: 'try@m.com', token: 'fakeToken' } };

    test('should dispatch signup and get current user', async () => {
      await axiosMock.onPost().replyOnce(201, payload);
      await signUp()(dispatch);
      expect(dispatch).toBeCalledTimes(2);
      delete payload.user.token;
      expect(dispatch).toHaveBeenCalledWith(
        { type: AUTHENTICATE, payload: { user: payload.user } },
      );
    });

    test('logoutUser', () => {
      expect(authUtils.getToken()).toBe('fakeToken');
      logoutUser();
      expect(authUtils.getToken()).toBe('');
    });

    test('should fail to sign up', async () => {
      const error = { message: 'failed to signup user' };
      await axiosMock.onPost().replyOnce(500, error);
      await signUp()(dispatch);
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: AUTHENTICATE, payload: { error } });
    });
  });

  describe('login()', () => {
    test('fail to dispatch login action', async () => {
      const error = { message: 'Invalid credentials supplied' };
      await axiosMock.onPost().replyOnce(500, error);

      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: AUTHENTICATE, payload: { error } });
    });

    test('dispatch login action and get current user', async () => {
      const payload = { user: { id: 1, token: 'fakeToken' } };
      await axiosMock.onPost().replyOnce(200, payload);

      await login()(dispatch);
      expect(authUtils.getToken()).toBe(payload.user.token);
      delete payload.user.token;
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch)
        .toHaveBeenCalledWith({ type: AUTHENTICATE, payload: { user: payload.user } });
    });
  });

  describe('place order', () => {
    test('should place order successfully', async () => {
      axiosMock.onPost().replyOnce(200);

      const isPlaced = await placeOrder()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: PLACE_ORDER });
      expect(isPlaced).toBeTruthy();
    });

    test('should place order successfully', async () => {
      axiosMock.onPost().replyOnce(500);

      const isPlaced = await placeOrder()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(isPlaced).toBeFalsy();
    });
  });

  describe('get selected menu', () => {
    test('should fetch a menu by id', async () => {
      const payload = { id: 1, name: 'jollof rice' };
      axiosMock.onGet().replyOnce(200, payload);
      await getSelectedMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_SELECTED_MENU, payload });
    });

    test('fails to fetch a menu by id', async () => {
      const payload = { id: 1, name: 'jollof rice' };
      axiosMock.onGet().replyOnce(500, payload);
      await getSelectedMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_SELECTED_MENU, payload: null });
    });
  });

  describe('menu', () => {
    test('adds a menu', async () => {
      axiosMock.onPost().replyOnce(201);
      await addMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: ADD_MENU });
    });

    test('fails to add/create a menu', async () => {
      axiosMock.onPost().replyOnce(500);
      await addMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });

    test('deletes a menu', async () => {
      axiosMock.onDelete().replyOnce(200);
      await deleteMenu(1)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_MENU, payload: 1 });
    });

    test('error deleting a menu', async () => {
      axiosMock.onDelete().replyOnce(500);
      await deleteMenu(1)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
