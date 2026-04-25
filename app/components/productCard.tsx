import Link from "next/link";

export const ProductCard = ({
  product,
}: Readonly<{
  product: any;
}>) => {
  return (
    <>
    <Link
      className={`border rounded-lg p-4 flex flex-col align-center items-center gap-2 w-40 justify-between cursor-pointer ${product?.availabilityStatus != "In Stock" ? "opacity-50 pointer-events-none relative" : ""}`}
      key={product.id}
      href={`/${product.id}`}
    >
      <img
        src={product?.images[0]}
        alt={product?.title}
        className="w-32 h-32 object-cover"
      />
      <h2 className="text-base font-semibold text-overflow-ellipsis display-webkit-box line-clamp-2 word-break-break-word text-center">
        {product?.title}
      </h2>
      <div className="flex gap-4">
        <span className="text-lg font-bold">${product?.price.toFixed(2)}</span>
      </div>
      {product?.availabilityStatus != "In Stock" && (
        <span className="text-red-600 font-bold absolute rotate-[-35deg] top-[37%] left-[8%] text-[1.75rem] border border-red-600 p-[0.1rem] opacity-100">Sold Out</span>
      )}
    </Link>
    
    </>
  );
};

export default ProductCard;
