import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const {
    config: {
      title,
      message,
      onNegativeClick,
      onPositiveClick,
      negativeTitle = 'Cancel',
      positiveTitle,
    },
  } = props;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-content__title">{title}</h3>
        <p className="modal-content__msg">{message}</p>
        <div className="modal-content__btns">
          <button onClick={onNegativeClick} className="negative btn btn-default">
            {negativeTitle}
          </button>
          <button onClick={onPositiveClick} className="positive btn btn-danger">
            {positiveTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  config: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Modal;
