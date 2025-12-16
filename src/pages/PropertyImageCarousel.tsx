import React, { useState } from "react";
import { PropertyImage } from "../pages/PropertiesPage";

const ImageCarousel: React.FC<{ images: PropertyImage[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images.length) return <div className="image-placeholder" />;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="carousel">
      <img src={images[index].imageUrl} alt="property" />
      {images.length > 1 && (
        <>
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
