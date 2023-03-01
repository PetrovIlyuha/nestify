import { FC } from "react";
import { Product } from "../../../../app/models/product.interface";
import ProductFrontCard from "../cards/ProductFrontCard";

interface Props {
  title: string;
  subTitle: string;
  items: Product[];
  loadingText: string;
}

const ProductGrid: FC<Props> = ({ title, subTitle, items, loadingText }) => {
  return (
    <section
      aria-labelledby="collection-heading"
      className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
    >
      <h2
        id="collection-heading"
        className="text-2xl font-bold tracking-tight text-gray-900"
      >
        {title}
      </h2>
      <p className="mt-4 text-base text-gray-500">{subTitle}</p>

      <div className="my-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-4">
        {!items.length ? (
          <h3>{loadingText}</h3>
        ) : (
          items.map((product) => (
            <ProductFrontCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
