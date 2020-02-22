import React, { useRef, useState } from "react";

const Slide = ({ src }) => {
  return (
    <div className="slider__image">
      <img src={src} />
    </div>
  );
};

export const Slider = ({ images }) => {
  const container = useRef(null);
  const [clickedElementIndex, setClickedElementIndex] = useState(0);
  const handleClick = i => {
    if (container.current === null) {
      return;
    }
    container.current.scroll({
      top: 0,
      left: i * container.current.clientWidth,
      behavior: "smooth"
    });
    setClickedElementIndex(i);
  };

  const handleScroll = () => {
    const scrollPosition = container.current.scrollLeft / container.current.clientWidth;

    if (Number.isInteger(scrollPosition)) {
      setClickedElementIndex(scrollPosition);
    }
  };

  const slides = images.filter(slide => !slide.includes("undefined"));

  return (
    <div className="slider">
      <div className="slider__pagination">
        {slides.length > 1 &&
          slides.map((slide, index) => {
            return (
              <span className={`slider__pagination-button ${clickedElementIndex === index ? "slider__pagination-button--active" : ""}`} onClick={() => handleClick(index)} style={{ fontSize: "30px" }} key={index}></span>
            );
          })}
      </div>
      <div className="slider__container" ref={container} onScroll={handleScroll}>
        {slides.map((slide, index) => {
          return <Slide key={slide + index} src={slide} />;
        })}
      </div>
    </div>
  );
};
