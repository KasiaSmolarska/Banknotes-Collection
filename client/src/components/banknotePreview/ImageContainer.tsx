import React from "react";

interface ImageContainerProps {
  src: string;
  alt: string;
}

export const ImageContainer = ({ src, alt }: ImageContainerProps) => {
  return (
    <div className="preview__image-container">
      <img className="preview__image" src={`/api/upload/image/${src}`} alt={alt} />
    </div>
  );
};
