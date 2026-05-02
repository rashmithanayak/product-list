"use client";

import React, { useState, useMemo, useRef } from "react";
import ProductCard from "./productCard";
import DropDown from "./dropDown";
import Loader from "./Loader";

import { useFetchProducts } from "../hooks/useFetchProducts";
import { useInfiniteScroller } from "../hooks/useInfiniteScroller";

interface ProductListProps {
  initialProducts: any[];
  initialPage: number;
  initialTotal: number;
}

export const ProductList = ({
  initialProducts,
  initialPage,
  initialTotal,
}: ProductListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const limit = 12;
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch products (REAL API PAGINATION)
  const { products, loading, hasMore, loadMore } = useFetchProducts(
    initialProducts,
    initialPage,
    (initialPage + 1) * limit < initialTotal ? true : false,
    limit,
  );

  const isSearching = searchTerm.trim().length > 0;

  // Infinite scroll observer
  useInfiniteScroller(
    observerRef,
    () => {
      if (!loading && hasMore && !isSearching) {
        loadMore();
      }
    },
    hasMore && !isSearching, // Disable infinite scroll when searching
  );

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter(
        (product: any) => product.category === selectedCategory,
      );
    }

    if (searchTerm) {
      result = result.filter((product: any) =>
        product.title.toLowerCase().includes(searchTerm),
      );
    }

    return result;
  }, [selectedCategory, products, searchTerm]);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), []);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex gap-4 flex-wrap sticky top-0 bg-white z-10 p-4 shadow-lg -m-4 w-screen">
        <div className="flex justify-between flex-col items-center gap-4 w-full md:flex-row">
          <h1 className="text-2xl font-bold">Product Listing</h1>
          <input
            type="text"
            placeholder=" 🔍 Search products..."
            className="border rounded p-2 text-sm w-full outline-none focus:outline-none h-10 md:w-64"
            onChange={debouncedSearch}
          />
        </div>

        <DropDown
          products={products}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="w-full relative my-4">
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`${loading ? "opacity-50" : ""} flex flex-wrap gap-4`}
          >
            {filteredProducts.length === 0 ? (
              <div className="text-lg font-semibold text-center w-full">
                No matching products found.
              </div>
            ) : (
              filteredProducts.map((product: any,index: number) => (
                <ProductCard product={product} key={product.id} index={index} />
              ))
            )}
          </div>
        )}
      </div>

      <div ref={observerRef} className="h-16 flex justify-center w-full">
        {loading && <Loader />}
        {!hasMore && (
          <div className="flex w-full items-center h-4">
            <span className="border border-gray-200 flex-grow h-0"></span>
            <span className="text-center text-gray-400 text-md px-4">
              No more products
            </span>
            <span className="border border-gray-200 flex-grow h-0"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
