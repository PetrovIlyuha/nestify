import { Product } from "../../../../app/models/product.interface";

interface ComponentProps {
  product: Product;
}

const ProductFrontCard: React.FC<ComponentProps> = ({ product }) => {
  return (
    <a
      key={product.name}
      href={product.id.toString()}
      className="group block my-3 relative"
    >
      <div
        aria-hidden="true"
        className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg group-hover:opacity-30 lg:aspect-w-5 lg:aspect-h-6 transition-all duration-300"
      >
        <img
          src={product.pictureUrl}
          alt={product.pictureUrl}
          className="h-full w-full object-cover object-center group-hover:scale-[112%] transition-all duration-300"
        />
      </div>
      <div className="absolute top-[30%] px-12 opacity-0 translate-y-24 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <h3 className="mt-4 text-lg bg-black/90 text-slate-100 text-center py-3 font-semibold underline underline-offset-2">
          {product.name}
        </h3>
        <p className="mt-2 text-md text-gray-800 font-bold">
          {product.description}
        </p>
      </div>
    </a>
  );
};

export default ProductFrontCard;
