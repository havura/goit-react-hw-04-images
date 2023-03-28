import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export function Modal(props) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      props.closeModal();
    }
  };

  const handleClickOverlay = e => {
    if (e.currentTarget === e.target) {
      props.closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClickOverlay}>
      <div className={css.modal}>
        <img src={props.largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onModalClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
