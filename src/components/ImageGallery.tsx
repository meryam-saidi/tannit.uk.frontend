import React from 'react';

const ImageGallery: React.FC = () => {
  return (
    <div className="image-gallery">
      {/* Ce sont des images et des valeurs d'espace réservé basées sur la capture d'écran */}
      <div className="gallery-item main-item">
        {/* Image principale avec des gens d'affaires */}
        <img src="https://placehold.co/400x300/e0e0e0/555555?text=Business+People" alt="Business people" />
        <div className="overlay-card top-left">
          <span className="icon">📈</span>
          <span className="value">$B 10.78</span>
        </div>
      </div>
      <div className="gallery-item">
        <img src="https://placehold.co/200x150/e0e0e0/555555?text=House+1" alt="House 1" />
      </div>
      <div className="gallery-item">
        <img src="https://placehold.co/200x150/e0e0e0/555555?text=City+Street" alt="City Street" />
      </div>
      <div className="gallery-item">
        <img src="https://placehold.co/200x150/e0e0e0/555555?text=Modern+Building" alt="Modern Building" />
      </div>
      <div className="gallery-item">
        <img src="https://placehold.co/200x150/e0e0e0/555555?text=Apartment+Building" alt="Apartment Building" />
        <div className="overlay-card bottom-right">
          <span className="icon">🌿</span>
          <span className="value">24.6 %</span>
        </div>
      </div>
      <div className="gallery-item">
        <img src="https://placehold.co/200x150/e0e0e0/555555?text=Woman+on+Phone" alt="Woman on phone" />
      </div>
      <div className="gallery-item">
        <img src="https://placehold.co/200x150/e0e0e0/555555?text=Roof+top" alt="Roof top" />
      </div>
    </div>
  );
};

export default ImageGallery;