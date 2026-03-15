import { notFound } from 'next/navigation';
import { ReusableErrMsg } from '../../component/common/ReusableErrMsg';
import { getEachProducts } from '../../lib/api';
import Link from 'next/link';
import Image from 'next/image';
import AddToCardButton from '../../component/AddToCartButton';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  let productDetails;

  try {
    productDetails = await getEachProducts(productId);
  } catch (err) {
    if (err instanceof Error && err.message === 'Product not found') {
      notFound();
    }
    const message =
      err instanceof Error ? err.message : 'Failed to load product.';
    return <ReusableErrMsg errMsg={message} />;
  }
  return (
    <>
      <Link
        href='/'
        className={
          'inline-flex items-center gap-2 text-sm uppercase tracking-wider mb-2 transition-colors duration-300 ease-in hover:text-yellow-400'
        }
      >
        ← Back to Products
      </Link>

      <div className='grid grid-cols-2 gap-3 items-start mb-8'>
        {/* Image */}
        <div className='relative aspect-square overflow-hidden'>
          <Image
            src={productDetails.thumbnail}
            alt={productDetails.title}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-contain p-8'
            priority
          />
        </div>

        {/* Details */}
        <div className='flex flex-col gap-4'>
          <p className='text-sm uppercase tracking-widest text-blue-700 dark:text-yellow-400 m-0'>
            {productDetails.category}
          </p>
          <h1 className='text-sm leading-1.5 tracking-tighter'>
            {productDetails.title}
          </h1>

          {productDetails.brand && (
            <p className='text-sm m-0 text-slate-400'>
              by {productDetails.brand}
            </p>
          )}

          <p className='text-xl font-bold text-blue-500 dark:text-yellow-400 m-0'>
            ${productDetails.price.toFixed(2)}
          </p>

          <div className='flex items-center gap-2'>
            <span className='text-sm text-slate-400'>
              ★ {productDetails.rating.toFixed(1)}
            </span>
            <span className='text-slate-400'>·</span>
            <span className='text-sm text-slate-400'>
              {productDetails.stock > 0
                ? `${productDetails.stock} in stock`
                : 'Out of stock'}
            </span>
          </div>

          <p className='text-sm tracking-widest text-slate-400 m-0 p-2 border-t border-t-slate-200 border-b-slate-200'>
            {productDetails.description}
          </p>

          <AddToCardButton product={productDetails} />
        </div>
      </div>

      {/* Additional images */}
      {productDetails.images && productDetails.images.length > 1 && (
        <div className='mt-8'>
          <p className='text-sm uppercase tracking-wider text-slate-300 mb-4'>
            More Images
          </p>
          <div className='grid grid-cols-4 gap-3'>
            {productDetails.images.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className='relative aspect-square overflow-hidden rounded-md'
              >
                <Image
                  src={src}
                  alt={`${productDetails.title} image ${i + 1}`}
                  fill
                  sizes='25vw'
                  className='object-contain p-6'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
