"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./productCard";
import DropDown from "./dropDown";

interface ProductListProps {
  products: any[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const [selctedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selctedCategory !== "All") {
    result = products.filter((product: any) => product.category === selctedCategory);
    }

    if(searchTerm) {
     result = products.filter((product: any) =>
        product.title.toLowerCase().includes(searchTerm),
      );
    }

    return result;
  }, [selctedCategory, products, searchTerm]);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
     setSearchTerm(searchTerm);
     setSelectedCategory("All");
    };

    const debouncedSearch = debounce(handleSearch, 300);


  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex justify-between flex-col align-center gap-4 w-full md:flex-row">
        <h1 className="text-2xl font-bold">Product Listing</h1>
        <input
          type="text"
          placeholder=" 🔍 Search products..."
          className="border rounded p-2 text-sm w-full outline-none focus:outline-none h-10 md:w-64"
          onChange={debouncedSearch}
        />
      </div>

      <DropDown products={products} setSelectedCategory={setSelectedCategory} />

      <div className="flex flex-wrap justify-start gap-4 w-full">
        {filteredProducts?.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
