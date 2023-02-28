import { useState, useEffect } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

interface HeroImageSliderProps {
  images: string[];
  interval: number;
}

const HeroImageSlider = ({ images, interval = 5000 }: HeroImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
      setTransition(true);
      setTimeout(() => {
        setTransition(false);
      }, 1000);
    }, interval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex, images.length, interval]);

  const updateIndex = (direction: string) => {
    if (direction === "left") {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        setCurrentIndex(images.length - 1);
      }
    } else {
      if (currentIndex < images.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 1000);
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      <ArrowLeftCircleIcon
        onClick={() => updateIndex("left")}
        className="w-12 h-12 absolute top-[50%] left-[2%] text-gray-300 z-20 rounded-full hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
      />
      <div
        style={{
          display: "flex",
          width: `${images.length * 100}%`,
          transform: `translateX(-${(100 / images.length) * currentIndex}%)`,
          transition: transition ? "transform 1s ease-in-out" : "",
        }}
      >
        {images.map((image: string) => (
          <img
            key={image}
            src={image}
            className="object-cover"
            alt=""
            style={{ width: `${100 / images.length}%`, height: "100%" }}
          />
        ))}
      </div>
      <ArrowRightCircleIcon
        onClick={() => updateIndex("right")}
        className="w-12 h-12 absolute top-[50%] right-[2%] text-gray-300 z-20 rounded-full hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
      />
    </div>
  );
};

export default HeroImageSlider;
