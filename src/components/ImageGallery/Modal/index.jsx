import { useEffect } from 'react';
import './assets/index.css';

export const Modal = ({ src, alt, onClose }) => {
  const handleEsc = ({ code }) => {
    if (code === 'Escape') onClose();
  };

  const handleClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="overlay" onClick={handleClick}>
      <div className="modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
