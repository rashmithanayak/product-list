import { ProductsResponse } from "../types";

export async function getProductsPaginated(skip: number,
  limit: number): Promise<ProductsResponse> {
  try {
    const res = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return await res.json(); // ✅ important
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // ✅ needed for error.tsx
  }
}

export async function productDetails(id: any) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 60 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product details: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}
