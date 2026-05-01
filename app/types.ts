export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
  availabilityStatus?: string;
  description?: string;
  brand?: string;
  rating?: number;
  discountPercentage?: number;
  sku?: string;
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
