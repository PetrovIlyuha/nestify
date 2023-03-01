import { FC } from "react";
import { Link } from "react-router-dom";

interface ComponentProps {
  category: {
    name: string;
    href: string;
    imageSrc: string;
  };
}

const CategoryCard: FC<ComponentProps> = ({ category }) => {
  return (
    <Link
      key={category.name}
      to={`/categories?view=${category.name}`}
      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
    >
      <span aria-hidden="true" className="absolute inset-0">
        <img
          src={category.imageSrc}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
      />
      <span className="relative mt-auto text-center text-xl font-bold text-white">
        {category.name}
      </span>
    </Link>
  );
};

export default CategoryCard;
