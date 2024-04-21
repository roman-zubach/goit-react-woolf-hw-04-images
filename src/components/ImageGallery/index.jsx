import React, { useState, useEffect, useRef } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import Modal from './Modal';
import './assets/index.css';

export const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    scrollToNewImages();
  }, [images]);

  const scrollToNewImages = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div ref={galleryRef}>
      <ul className="gallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            onClick={() =>
              handleImageClick({
                src: largeImageURL,
                alt: tags,
              })
            }
          />
        ))}
      </ul>
      {showModal && selectedImage && (
        <Modal onClose={handleCloseModal} src={selectedImage.src} alt={selectedImage.alt} />
      )}
    </div>
  );
};
