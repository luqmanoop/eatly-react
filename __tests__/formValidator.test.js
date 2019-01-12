/* eslint-disable no-underscore-dangle */
import validator from '../src/utils/formValidator';

describe('formValidator', () => {
  test('_required', () => {
    expect(validator._required('')).toBe('This field is required');
    expect(validator._required('Nice')).toBe(undefined);
  });
  test('_email', () => {
    expect(validator._email('doe@mail.com')).toBe(undefined);
    expect(validator._email('doe@mail')).toBe('Invalid email address');
  });
  test('_min3', () => {
    expect(validator._minValue3('123')).toBe(undefined);
    expect(validator._minValue3('12')).toBe('Must be at least 3 characters');
  });
  test('_min6', () => {
    expect(validator._minValue6('123456')).toBe(undefined);
    expect(validator._minValue6('12')).toBe('Must be at least 6 characters');
  });
  test('_passwordMatch', () => {
    expect(validator._passwordMatch('asdf', { password: 'asdf' })).toBe(undefined);
    expect(validator._passwordMatch('asdf', { password: 'lol' })).toBe('Passwords do not match');
  });
  test('_alphaNumeric', () => {
    expect(validator._alphaNumeric('asb2')).toBe(undefined);
    expect(validator._alphaNumeric('###')).toBe('Only alphanumeric characters');
  });
});
