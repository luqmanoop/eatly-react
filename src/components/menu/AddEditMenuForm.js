import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Input from '../presentation/Input';
import formValidator from '../../utils/formValidator';
import Button from '../presentation/Button';

const { _required, _minValue3, _minPrice } = formValidator;

const AddEditMenuForm = ({
  onAddEditMenu, title, handleSubmit, submitting, reset,
}) => (
  <form onSubmit={handleSubmit(values => onAddEditMenu(values, reset))}>
    <h1 className="form-title">{`${title} menu`}</h1>
    <Field
      autoFocus
      placeholder="Jollof rice"
      name="name"
      label="Name"
      id="name"
      type="text"
      validate={[_required, _minValue3]}
      component={Input}
    />
    <Field
      placeholder="https://img.io/jollof.jpg"
      name="imgUrl"
      label="Image URL"
      id="url"
      type="url"
      validate={[_required]}
      component={Input}
    />
    <Field
      placeholder="299.99"
      name="price"
      id="price"
      label="Price"
      type="number"
      min="200"
      step="0.01"
      validate={[_required, _minPrice]}
      component={Input}
    />
    <div className="input-group">
      <Button
        disabled={submitting}
        classes="btn-danger"
        type="submit"
        title={title}
      />
    </div>
  </form>
);


AddEditMenuForm.defaultProps = {
  onAddEditMenu: null,
  title: 'Add',
  handleSubmit: null,
  submitting: false,
  reset: null,
};

AddEditMenuForm.propTypes = {
  handleSubmit: PropTypes.func,
  onAddEditMenu: PropTypes.func,
  title: PropTypes.string,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
};

export default reduxForm({ form: 'add-edit-menu' })(AddEditMenuForm);
