import { productDetails } from "../services/api";
import ViewDetails from "../components/viewDetails";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await productDetails(id);

  return <ViewDetails product={product} />;
}
