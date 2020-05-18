import React, { useRef, useState } from "react";

interface SlideProps {
  src: string;
  index: number;
}

const Slide = ({ src, index }: SlideProps) => {
  return (
    <div className="slider__image">
      <img alt={"photo" + index} src={src} />
    </div>
  );
};

interface SliderProps {
  images: string[];
}

export const Slider = ({ images }: SliderProps): React.ReactNode => {
  const container = useRef<HTMLDivElement>(null);
  const [clickedElementIndex, setClickedElementIndex] = useState(0);
  const handleClick = (i: number) => {
    if (container.current === null) {
      return;
    }
    container &&
      container.current.scroll({
        top: 0,
        left: i * container.current.clientWidth,
        behavior: "smooth",
      });
    setClickedElementIndex(i);
  };

  const handleScroll = (): void => {
    if (container === null || container.current === null) {
      return;
    }
    const scrollPosition = container.current.scrollLeft / container.current.clientWidth;

    setClickedElementIndex(Math.round(scrollPosition));
  };

  const slides = images.filter((slide) => !slide.includes("undefined"));

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
          return <Slide key={slide + index} src={slide} index={index} />;
        })}
      </div>
    </div>
  );
};
