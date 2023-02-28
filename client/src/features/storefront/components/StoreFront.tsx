import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import MainLayout from "../../../app/layout/MainLayout";
import { ProductCategory } from "../../../app/models/product-category.interface";
import { Product } from "../../../app/models/product.interface";
import CategoryCard from "../../../app/shared/components/cards/CategoryCard";
import ImamgeSliderHorizontal from "../../../app/shared/components/sliders/HeroImageSlider";

// import Logo from '../images/logo.jpg'
import ProductFrontCard from "./cards/ProductFrontCard";

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
      {/* Mobile menu */}
      <MainLayout productCategories={productCategories}>
        {/* Hero section */}
        <div className="relative bg-gray-900">
          {/* Decorative image and overlay */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            {heroImages.length && (
              <ImamgeSliderHorizontal images={heroImages} interval={7000} />
            )}
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 opacity-50"
          />

          {/* Navigation */}

          <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
              Make your home a haven with our exquisite furniture collection.
            </h1>
            <p className="mt-4 text-xl text-white">
              Welcome to our online furniture store, where you can find the
              perfect piece for your home. Our wide selection of sofas, chairs,
              tables, and more is designed to fit any style and budget.
            </p>
            <a
              href="#"
              className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Shop New Arrivals
            </a>
          </div>
        </div>

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
              <a
                href="#"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
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
              <a
                href="#"
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </section>

          {/* Featured section */}
          <section
            aria-labelledby="social-impact-heading"
            className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
          >
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                {heroImages.length && (
                  <ImamgeSliderHorizontal images={heroImages} interval={3000} />
                )}
              </div>
              <div className="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
                <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                  <h2
                    id="social-impact-heading"
                    className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                  >
                    <span className="block sm:inline mr-2">Level up</span>
                    <span className="block sm:inline">your lifestyle</span>
                  </h2>
                  <p className="mt-3 text-xl text-white">
                    Make your living space beautiful and organized. Post a
                    picture to social media and watch it get more likes than
                    life-changing announcements.
                  </p>
                  <a
                    href="#"
                    className="mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                  >
                    Shop Workspace
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Collection section */}
          <section
            aria-labelledby="collection-heading"
            className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
          >
            <h2
              id="collection-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              All Products
            </h2>
            <p className="mt-4 text-base text-gray-500">
              Explore Our Complete Collection of Furniture Products From classic
              to contemporary, our diverse range of furniture pieces are
              designed to cater to your unique style and preferences.
            </p>

            <div className="my-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-4">
              {!products.length ? (
                <h3>Loading Products...</h3>
              ) : (
                products.map((product) => (
                  <ProductFrontCard key={product.id} product={product} />
                ))
              )}
            </div>
          </section>
        </main>
      </MainLayout>
    </div>
  );
}
