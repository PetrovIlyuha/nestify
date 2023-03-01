import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductCategory } from "../../../app/models/product-category.interface";
import ImageSliderHorizontal from "../../../app/shared/components/sliders/ImageSliderHorizontal";

interface Props {
  items: ProductCategory[];
  title: string;
  subTitle: string;
  buttonText: string;
}

const FeaturedProducts: FC<Props> = ({
  items,
  title,
  subTitle,
  buttonText,
}) => {
  const titleParts = [
    title.split(" ").slice(0, 2).join(" "),
    title.split(" ").slice(2).join(" "),
  ];
  const uniqueImagesOnePerCategory = items.reduce((acc: string[], category) => {
    const firstProduct = category.products[0];
    if (!acc.includes(firstProduct.pictureUrl)) {
      acc.push(firstProduct.pictureUrl);
    }
    return acc;
  }, []);

  return (
    <section
      aria-labelledby="social-impact-heading"
      className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          {uniqueImagesOnePerCategory.length && (
            <ImageSliderHorizontal
              images={uniqueImagesOnePerCategory}
              interval={3000}
            />
          )}
        </div>
        <div className="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id="social-impact-heading"
              className="font-bold tracking-tight text-white text-2xl lg:text-3xl"
            >
              <span className="block sm:inline mr-2">{titleParts[0]}</span>
              <span className="block sm:inline">{titleParts[1]}</span>
            </h2>
            <p className="mt-3 text-sm mx-12 text-justify lg:text-center lg:mx-0 lg:text-xl text-white">
              {subTitle}
            </p>
            <Link
              to={`/categories?view=new`}
              className="mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
