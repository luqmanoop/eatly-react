import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AddEditMenuForm from './AddEditMenuForm';
import { addMenu } from '../../actions/menu';

class AddEditMenu extends Component {
    isImageURL = url => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.addEventListener('load', () => resolve(true));
      img.addEventListener('error', () => reject(new SubmissionError({
        imgUrl: 'Not a valid image URL',
      })));
    })


    handleAddEditMenu = async (values, reset) => {
      const newMenu = { ...values, description: 'not necessary' };
      const { addMenu: dispatchAddMenu } = this.props;
      const { imgUrl } = newMenu;
      await this.isImageURL(imgUrl);
      return !(await dispatchAddMenu(newMenu)) ? reset() : null;
    }

    render() {
      const { auth: { user, isLoggedIn } } = this.props;

      if (user === null) return null;
      if (user && (!user.is_admin || !isLoggedIn)) return <Redirect to="/login" />;
      return (
        <div>
          <AddEditMenuForm onAddEditMenu={this.handleAddEditMenu} />
        </div>
      );
    }
}

AddEditMenu.defaultProps = {
  addMenu: null,
  auth: null,
};

AddEditMenu.propTypes = {
  addMenu: PropTypes.func,
  auth: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { addMenu })(AddEditMenu);
