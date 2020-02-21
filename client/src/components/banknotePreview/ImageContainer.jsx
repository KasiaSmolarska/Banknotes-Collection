import React from "react";

export const ImageContainer = ({ src, alt }) => {
  return (
    <div className="preview__image-container">
      <img className="preview__image" src={`/api/upload/image/${src}`} alt={alt} />
    </div>
  );
};
