import { useEffect, useState } from "react";
import { getProductsPaginated } from "../services/api";
import { Product } from "../types";

export const useFetchProducts = (initialProducts: Product[],
  initialPage: number,
  initialHasMore: boolean,
  limit: number) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getProductsPaginated(page * limit, limit);

        setProducts((prev) => [...prev, ...data.products]);

        // ✅ safer condition
        if ((page + 1) * limit >= data.total) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return { products, loading, hasMore, loadMore };
};
