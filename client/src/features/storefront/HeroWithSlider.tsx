import React from "react";
import { Link } from "react-router-dom";
import ImageSliderHorizontal from "../../app/shared/components/sliders/ImageSliderHorizontal";

const HeroWithSlider = ({ heroImages }: { heroImages: string[] }) => {
  return (
    <div className="relative bg-gray-900">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {heroImages.length && (
          <ImageSliderHorizontal images={heroImages} interval={7000} />
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-50"
      />

      {/* Navigation */}

      <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
        <h1 className="text-xl font-bold tracking-tight text-white lg:text-6xl">
          Make your home a haven with our exquisite furniture collection.
        </h1>
        <p className="mt-4 text-md mx-12 lg:mx-0 lg:text-xl text-white">
          Welcome to our online furniture store, where you can find the perfect
          piece for your home. Our wide selection of sofas, chairs, tables, and
          more is designed to fit any style and budget.
        </p>
        <Link
          to={`/categories?view=new`}
          className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
        >
          Shop New Arrivals
        </Link>
      </div>
    </div>
  );
};

export default HeroWithSlider;
