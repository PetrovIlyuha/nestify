import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import MainLayout from "../../../app/layout/MainLayout";
import { ProductCategory } from "../../../app/models/product-category.interface";
import { Product } from "../../../app/models/product.interface";
import CategoryCard from "../../../app/shared/components/cards/CategoryCard";
import HeroWithSlider from "../HeroWithSlider";

import FeaturedProducts from "./FeaturedProducts";
import ProductGrid from "./grids/ProductGrid";

export default function StoreFront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/products").then(({ data }) => {
      setProducts(data);
      const categories = data.reduce(
        (acc: ProductCategory[], product: Product) => {
          const { type } = product;
          const category = acc.find((c) => c.type === type);

          if (!category) {
            acc.push({ type, products: [product] });
          } else {
            category.products.push(product);
          }

          return acc;
        },
        []
      );
      setProductCategories(categories);
      const heroImages = data.map((p: Product) => p.pictureUrl);
      setHeroImages(heroImages);
    });
  }, []);

  return (
    <div className="bg-white">
      <MainLayout productCategories={productCategories}>
        <HeroWithSlider heroImages={heroImages} />
        <main>
          {/* Category section */}
          <section
            aria-labelledby="category-heading"
            className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
          >
            <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
              <h2
                id="category-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Shop by Category
              </h2>
              <Link
                to={`/categories?view=all`}
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>

            <div className="mt-4 flow-root">
              <div className="-my-2">
                <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                  <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                    {productCategories.length > 0 ? (
                      productCategories
                        .map((category) => ({
                          name: category.type,
                          href: category.type,
                          imageSrc: category.products[0].pictureUrl,
                        }))
                        .map((category) => (
                          <CategoryCard
                            key={category.name}
                            category={category}
                          />
                        ))
                    ) : (
                      <h2>Loading Categories...</h2>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 px-4 sm:hidden">
              <Link
                to={`/categories?view=all`}
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </section>

          <FeaturedProducts
            items={productCategories}
            title="Level Up Your Lifestyle"
            subTitle="Make your living space beautiful and organized. Post a picture to social media and watch it get more likes than life-changing announcements."
            buttonText="Start Selecting"
          />

          <ProductGrid
            title="All Products"
            subTitle="Explore Our Complete Collection of Furniture Products From classic to contemporary, our diverse range of furniture pieces are designed to cater to your unique style and preferences."
            items={products}
            loadingText="Loading Products..."
          />
        </main>
      </MainLayout>
    </div>
  );
}
