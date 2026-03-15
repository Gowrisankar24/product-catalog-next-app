import { Product } from '../lib/types';
import { Card } from '../../components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='group relative overflow-hidden rounded-xl border bg-linear-to-br from-blue-100 to-blue-200 dark:border-neutral-800 dark:bg-linear-to-br dark:from-neutral-900 dark:to-neutral-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10'>
      <Link href={`/products/${product.id}`} className='flex flex-col'>
        <div className='relative aspect-square overflow-hidden'>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'
            className='object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110'
          />
          {/* Gradient overlay */}
          <div className='pointer-events-none absolute inset-0 dark:bg-linear-to-t from-black/70 via-black/20 to-transparent' />
        </div>
        <div className='space-y-1 p-4 border-t border-neutral-400'>
          <p className='text-xs tracking-widest uppercase text-blue-700 dark:text-yellow-400'>
            {product.category}
          </p>
          <h2 className='font-mono text-lg font-semibold text-slate-400 dark:text-white leading-tight line-clamp-2'>
            {product.title}
          </h2>
          <p className='text-xl font-bold text-blue-500 dark:text-yellow-300'>
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
