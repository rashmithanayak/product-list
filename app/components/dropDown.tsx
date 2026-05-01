"use client";
import React from "react";

export const DropDown = ({
  products,
  setSelectedCategory,
}: {
  products: any[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const categories: string[] = Array.from(
    new Set(products?.map((product: any) => product.category)),
  );
  return (
    <div className="relative">
      <label htmlFor="category">Category: </label>
      <select
        className="border cursor-pointer rounded p-2 text-sm appearance-none w-45 capitalize text-slate-600 outline-none focus:outline-none"
        id="category"
        name="category"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All" key={1}>All</option>
        {categories.length > 0 &&
          categories.map((category: string, index: number) => {
            return (
              <option className="" value={category} key={index+2}>
                {category}
              </option>
            );
          })}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2">▼</span>
    </div>
  );
};

export default React.memo(DropDown);
