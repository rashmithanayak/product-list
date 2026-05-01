import Link from "next/link";
import Image from "next/image";

export const ProductCard = ({
  product,
}: Readonly<{
  product: any;
}>) => {
  return (
    <div className="relative">
      <Link
        href={`/${product.id}`}
        className={`border rounded-lg p-4 w-40 h-64 flex flex-col items-center gap-2 justify-between ${
          product?.availabilityStatus !== "In Stock"
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
      >
        <div className="w-32 h-32 relative">
          <Image
            src={product?.images[0]}
            alt={product?.title}
            width={128}
            height={128}
            className="object-cover"
            priority={true}
          />
        </div>

        <h2 className="text-base font-semibold line-clamp-2 text-center leading-tight">
          {product?.title}
        </h2>

        <span className="text-lg font-bold">${product?.price?.toFixed(2)}</span>
      </Link>

      {product?.availabilityStatus !== "In Stock" && (
        <span className="absolute rotate-[-35deg] top-[40%] left-[10%] text-[1.5rem] border border-red-600 px-1 text-red-600 font-bold bg-white">
          Sold Out
        </span>
      )}
    </div>
  );
};

export default ProductCard;
