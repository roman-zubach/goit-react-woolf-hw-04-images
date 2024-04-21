import { useCallback, useEffect } from 'react';
import './assets/index.css';

export const Modal = ({ src, alt, onClose }) => {
  const handleEsc = useCallback(({ code }) => {
    if (code === 'Escape') onClose();
  }, [onClose]);

  const handleClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  return (
    <div className="overlay" onClick={handleClick}>
      <div className="modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
