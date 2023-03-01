import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import MainLayout from "../../app/layout/MainLayout";
import { ProductCategory } from "../../app/models/product-category.interface";
import axios from "../../api/axios";
import { Product } from "../../app/models/product.interface";

import cx from "classnames";

const sortOptions = [
  { name: "Price: Low to High", value: "priceAsc" },
  { name: "Price: High to Low", value: "priceDesc" },
];
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "hats", label: "Hats" },
      { value: "bundles", label: "Bundles" },
      { value: "carry", label: "Carry" },
      { value: "objects", label: "Objects" },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "clothing-company", label: "Clothing Company" },
      { value: "fashion-inc", label: "Fashion Inc." },
      { value: "shoes-n-more", label: "Shoes 'n More" },
      { value: "supplies-n-stuff", label: "Supplies 'n Stuff" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "grey", label: "Grey" },
      { value: "blue", label: "Blue" },
      { value: "olive", label: "Olive" },
      { value: "tan", label: "Tan" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryPage() {
  const [queryParam, setQueryParam] = useState<string>("");
  const { search } = useLocation();

  useEffect(() => {
    const match = search.match(/[\\?&]view=([^&]+)/);
    const viewParam = match ? match[1] : null;
    const decodedViewParam = decodeURIComponent(viewParam ?? "");
    setQueryParam(decodedViewParam);
  }, [search]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [fullyShowedCategories, setFullyShowedCategories] = useState<string[]>(
    []
  );

  const [displayedCategories, setDisplayedCategories] =
    useState<ProductCategory[]>(productCategories);

  const [displayedCategoriesSnapShot, setDisplayedCategoriesSnapShot] =
    useState<ProductCategory[]>(productCategories);

  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [wasPriceSorted, setWasPriceSorted] = useState<boolean>(false);

  const [promotedCategory, setPromotedCategory] =
    useState<ProductCategory | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [promotedCategory]);

  useEffect(() => {
    axios.get("/api/products").then(({ data }) => {
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
    });
  }, []);

  useEffect(() => {
    let preparedDisplayedCategories: ProductCategory[] = [];
    if (!wasPriceSorted) {
      if (queryParam === "new") {
        const oneProductFromEachCategoryCollection = productCategories.reduce(
          (acc: Product[], category) => {
            const firstProduct = category.products[0];
            if (!acc.includes(firstProduct)) {
              acc.push(firstProduct);
            }
            return acc;
          },
          []
        );
        preparedDisplayedCategories = [
          {
            type: "Newest From All Categories",
            products: oneProductFromEachCategoryCollection,
          },
        ];
        setDisplayedCategories(() => preparedDisplayedCategories);
      } else if (queryParam === "all") {
        preparedDisplayedCategories = productCategories;
        setDisplayedCategories(preparedDisplayedCategories);
      } else {
        const categoryChosen = productCategories.find(
          (c) => c.type.split(" ")[0].trim() === queryParam.split(" ")[0].trim()
        );
        if (categoryChosen) {
          preparedDisplayedCategories = [categoryChosen];
          setDisplayedCategories(() => preparedDisplayedCategories);
        }
      }
    }
    setPriceFilter(
      Math.max(
        ...productCategories.flatMap((c) => c.products).map((p) => p.price)
      )
    );
    setDisplayedCategoriesSnapShot(preparedDisplayedCategories);
    setFullyShowedCategories(preparedDisplayedCategories.map((c) => c.type));
  }, [queryParam, productCategories, wasPriceSorted]);

  useEffect(() => {
    let promotedCategory = null;
    if (!wasPriceSorted) {
      if (queryParam !== "all") {
        if (queryParam === "new") {
          promotedCategory =
            productCategories[
              Math.floor(Math.random() * productCategories.length)
            ];
        } else {
          const promotedCategoriesCollection = productCategories.filter(
            (c) =>
              !displayedCategories
                .map((displayed) => displayed.type)
                .includes(c.type)
          );
          promotedCategory =
            promotedCategoriesCollection[
              Math.floor(Math.random() * promotedCategoriesCollection.length)
            ];
        }
      }
      setPromotedCategory(promotedCategory);
    }
  }, [displayedCategories, productCategories, queryParam, wasPriceSorted]);

  const applyPriceSorting = (type: string) => {
    setWasPriceSorted(true);
    let productCategoriesSortedByPrice;
    if (type === "priceAsc") {
      productCategoriesSortedByPrice = displayedCategories.map((c) => ({
        type: c.type,
        products: c.products.sort((a, b) => a.price - b.price),
      }));
    } else {
      productCategoriesSortedByPrice = displayedCategories.map((c) => ({
        type: c.type,
        products: c.products.sort((a, b) => b.price - a.price),
      }));
    }
    setDisplayedCategories(productCategoriesSortedByPrice);
  };

  useEffect(() => {
    const productCategoriesFilteredByPrice = productCategories.map((c) => ({
      type: c.type,
      products: c.products.filter((p) => p.price <= priceFilter),
    }));
    setDisplayedCategories(productCategoriesFilteredByPrice);
  }, [priceFilter, productCategories]);

  const setShowCategory = (name: string) => {
    setFullyShowedCategories((showed) =>
      showed.includes(name)
        ? showed.filter((cName) => cName !== name)
        : [...showed, name]
    );
  };

  return (
    <MainLayout productCategories={productCategories}>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 sm:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.name}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={false}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Header Filters Bar */}
        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 pt-6 mx-auto max-w-3xl"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-medium text-gray-900"
                            )}
                            onClick={() => applyPriceSorting(option.value)}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="flex items-center w-[300px] mt-3">
              <label
                htmlFor="priceFilterRange"
                className="mb-2 inline-block text-neutral-700 font-medium w-1/2"
              >
                Price Filter
              </label>
              <div className="w-full flex-col items-center">
                <div className="text-center">
                  Less Than $ <strong>{priceFilter}</strong>
                </div>
                <input
                  type="range"
                  className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                  id="priceFilterRange"
                  onChange={(e) => setPriceFilter(+e.target.value)}
                  value={priceFilter}
                  min={Math.min(
                    ...displayedCategoriesSnapShot
                      .flatMap((c) => c.products)
                      .map((p) => p.price)
                  )}
                  max={Math.max(
                    ...displayedCategoriesSnapShot
                      .flatMap((c) => c.products)
                      .map((p) => p.price)
                  )}
                />
              </div>
            </div>
          </div>
        </section>
        <main className="mb-12">
          {displayedCategories.map((category) => (
            <div
              className={cx({
                "mx-auto max-w-3xl relative": true,
                "px-0 py-4 mb-24": !fullyShowedCategories.includes(
                  category.type
                ),
                "px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-12":
                  fullyShowedCategories.includes(category.type),
              })}
            >
              <div className="py-2 text-center">
                <h1
                  className={cx({
                    "font-bold tracking-tight text-gray-900 cursor-pointer transition-all duration-300":
                      true,
                    "absolute left-0 text-2xl": !fullyShowedCategories.includes(
                      category.type
                    ),
                    "text-3xl": fullyShowedCategories.includes(category.type),
                  })}
                  onClick={() => setShowCategory(category.type)}
                >
                  {category.type}
                </h1>
                <p
                  className={cx({
                    "mx-auto mt-4 max-w-3xl text-base text-gray-500": true,
                    hidden: !fullyShowedCategories.includes(category.type),
                  })}
                >
                  Thoughtfully designed objects for the workspace, home, and
                  travel.
                </p>
                {category.products[0] && (
                  <img
                    src={category.products[0].pictureUrl}
                    alt={category.products[0].pictureUrl}
                    className={cx({
                      "max-h-[220px] w-[120px] absolute left-0 top-[114%] object-cover object-center rounded-lg shadow-md":
                        true,
                      hidden: fullyShowedCategories.includes(category.type),
                    })}
                    onClick={() => setShowCategory(category.type)}
                  />
                )}
              </div>
              <Transition
                show={fullyShowedCategories.includes(category.type)}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <section aria-labelledby="products-heading" className="mt-2">
                  <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {category.products.map((product) => (
                      <a key={product.id} href={product.name} className="group">
                        {/* <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3"> */}
                        <div className="w-full max-h-[280px] overflow-hidden rounded-lg">
                          <img
                            src={product.pictureUrl}
                            alt={product.pictureUrl}
                            className="max-h-[220px] w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p>{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm italic text-gray-500">
                          {product.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              </Transition>
            </div>
          ))}
          {promotedCategory && (
            <section
              aria-labelledby="featured-heading"
              className="relative mx-auto max-w-5xl mt-12 mb-24 overflow-hidden rounded-lg lg:h-96"
            >
              <div className="absolute inset-0">
                <img
                  src={promotedCategory.products[0].pictureUrl}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div
                aria-hidden="true"
                className="relative h-96 w-full lg:hidden"
              />
              <div
                aria-hidden="true"
                className="relative h-32 w-full lg:hidden"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:flex-col lg:items-start lg:rounded-tl-lg lg:rounded-br-none">
                <div>
                  <h2
                    id="featured-heading"
                    className="text-xl font-bold text-white"
                  >
                    {promotedCategory.type}
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    {promotedCategory.products[0].description}
                  </p>
                </div>
                <Link
                  to={`/categories?view=${promotedCategory.type}`}
                  className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 py-3 px-4 text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
                >
                  View the collection
                </Link>
              </div>
            </section>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
