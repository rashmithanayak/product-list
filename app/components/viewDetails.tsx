export const ViewDetails = ({
  product,
}: Readonly<{
  product: any;
}>) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };
  return (
    <div className="p-1 flex flex-col gap-3">
      <h1 className="text-lg font-bold">{product?.title}</h1>
      <img
        src={product?.images[0]}
        alt={product?.title}
        className="w-64 h-64 "
      />
      <h2 className="text-xl font-bold">{product?.brand}</h2>
      <p className="text-sm text-gray-600">{product?.description}</p>
      <div className="flex gap-2 font-bold items-center">
        <span
          className={`${getRatingColor(product?.rating)} text-white px-1 rounded flex gap-1 items-center`}
        >
          {product?.rating} <span className="text-xs">★</span>
        </span>
        <span className="text-lg font-bold">${product?.price.toFixed(2)}</span>
        <span
          className={`text-sm ${product?.discountPercentage > 0 ? "text-green-500" : "text-gray-600"}`}
        >
          {product?.discountPercentage > 0
            ? `${product?.discountPercentage}% off`
            : "No discount"}
        </span>
      </div>

      <div className="flex flex-col gap-2 border rounded p-2">
        <h1 className="font-bold">Additional Information</h1>
        <span>
          <span className="font-semibold">SKU:</span> {product.sku}
        </span>
        <span>
          <span className="font-semibold">Weight:</span> {product.weight} kg
        </span>
        <span>
          <span className="font-semibold">Warranty Information:</span>{" "}
          {product.warrantyInformation}
        </span>
        <span>
          <span className="font-semibold">Shipping Information:</span>{" "}
          {product.shippingInformation}
        </span>
        <span>
          <span className="font-semibold">Return Policy:</span>{" "}
          {product.returnPolicy}
        </span>
      </div>


      <div>
        <h1 className="font-bold mb-2">Ratings and Reviews</h1>
        {product?.reviews?.length > 0 ? (
          product.reviews.map((review: any, index: number) => (
            <div key={index} className="py-2 border-b">
              <div className="flex gap-3 items-center mb-2">
                <span
                  className={`${getRatingColor(review.rating)} text-white px-2 rounded flex gap-1 items-center`}
                >
                  {review.rating} <span className="text-xs">★</span>
                </span>
                <span className="font-semibold">{review.reviewerName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
