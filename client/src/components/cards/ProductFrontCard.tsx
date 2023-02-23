import { Product } from "../types/product.interface";

interface ComponentProps {
  product: Product;
}

const ProductFrontCard: React.FC<ComponentProps> = ({ product }) => {
  return (
    <a key={product.name} href={product.id.toString()} className="group block">
      <div
        aria-hidden="true"
        className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
      >
        <img
          src={product.pictureUrl}
          alt={product.pictureUrl}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900">
        {product.name}
      </h3>
      <p className="mt-2 text-sm text-gray-500">{product.description}</p>
    </a>
  );
};

export default ProductFrontCard;
