export async function getProducts() {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-cache" // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function productDetails(id:any) {
  console.log("id ",id)
  const res = await fetch(`https://dummyjson.com/products/${id}`,{
    cache: "no-cache"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}