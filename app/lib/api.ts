import { Product, ProductsResponse } from './types';

const BASE_URL = 'https://dummyjson.com';

export async function getAllProduct(): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products?limit=25`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
}

export async function getEachProducts(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
