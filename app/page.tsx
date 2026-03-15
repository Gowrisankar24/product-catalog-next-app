import { ReusableErrMsg } from './component/common/ReusableErrMsg';
import ProductCard from './component/ProductCard';
import { getAllProduct } from './lib/api';
import { ProductsResponse } from './lib/types';

export default async function Home() {
  let productsData;
  try {
    productsData = await getAllProduct();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to load products.';
    <ReusableErrMsg errMsg={message} />;
  }
  const { products } = productsData as ProductsResponse;
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {products?.map((d) => (
        <ProductCard key={d.id} product={d} />
      ))}
    </div>
  );
}
