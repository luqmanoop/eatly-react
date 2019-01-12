const storageKey = 'token';

export default {
  saveToken: token => window.localStorage.setItem(storageKey, token),
  getToken: () => window.localStorage.getItem(storageKey) || '',
  removeToken: () => window.localStorage.removeItem(storageKey),
};
