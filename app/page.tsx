import ProductList from "./components/productList";
import { getProductsPaginated } from "./services/api";


export default async function Home() {
  const data = await getProductsPaginated(0,12);

  console.log("data ",data)
  return (
    <div className="">
      <ProductList 
      initialProducts={data.products}
      initialPage={1}
      initialTotal={data.total}
      />
    </div>
  );
}
