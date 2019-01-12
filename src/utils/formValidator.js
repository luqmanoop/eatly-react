const minValue = min => value => (value && value.length < min ? `Must be at least ${min} characters` : undefined);

export default {
  _required: value => (value || typeof value === 'number' ? undefined : 'This field is required'),
  _email: value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined),
  _alphaNumeric: value => (value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined),
  _minValue3: minValue(3),
  _minValue6: minValue(6),
  _passwordMatch: (confirmPassword, { password }) => (confirmPassword !== password ? 'Passwords do not match' : undefined),
};
