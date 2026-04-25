import ProductList from "./components/productList";
import { getProducts } from "./services/api";


export default async function Home() {
    const products = await getProducts();

  return (
    <div className="">
      <ProductList products={products.products} />
    </div>
  );
}
