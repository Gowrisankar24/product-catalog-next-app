'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className='flex flex-col text-center items-center justify-center gap-4 px-4 py-8'>
        <p className='text-5xl text-slate-300 m-0'>◈</p>
        <h2 className='font-mono text-3xl tracking-wide text-slate-300'>
          Your cart is empty
        </h2>
        <p className='text-lg text-slate-400 m-0'>
          Browse the catalog and add something you like.
        </p>
        <Link
          href='/'
          className='mt-2 px-3 py-5 bg-yellow-400 text-black font-bold uppercase tracking-wide rounded-md transition-colors'
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-2 pb-2 border border-t-slate-200 dark:border-t-slate-700'>
        <h1 className='font-medium text-xl tracking-widest ml-2'>Cart</h1>
        <button
          onClick={clearCart}
          className='bg-none border border-slate-100  dark:border-neutral-600 text-sm uppercase tracking-wide p-2 cursor-pointer transition-colors duration-300 hover:text-red-500'
        >
          Clear all
        </button>
      </div>

      <div className='grid grid-cols-[1fr_320px] gap-6 items-start'>
        {/* Item list */}
        <ul className='list-none flex flex-col gap-1'>
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className='grid grid-cols-[90px_1fr_auto_auto_auto] gap-4 items-center p-4 bg-linear-to-br from-blue-100 to-blue-200 dark:border-neutral-800 dark:bg-linear-to-br dark:from-neutral-900 dark:to-neutral-800 rounded-md transition-colors duration-200 hover:border-slate-200'
            >
              <div className='relative w-20 h-20 bg-linear-to-br from-blue-500 to-blue-200 dark:border-neutral-800 dark:bg-linear-to-br dark:from-neutral-500 dark:to-neutral-600 rounded-lg overflow-hidden shrink-0'>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes='80px'
                  className={'object-contain p-4'}
                />
              </div>

              <div className='min-w-0'>
                <Link
                  href={`/products/${product.id}`}
                  className='block text-lg font-semibold text-blue-600 dark:text-white whitespace-nowrap overflow-hidden mb-2 transition-colors hover:text-yellow-400'
                >
                  {product.title}
                </Link>
                <p className='text-lg text-blue-500 dark:text-slate-300 m-0'>
                  ${product.price.toFixed(2)} each
                </p>
              </div>

              <div className='flex items-center gap-2 bg-linear-to-br from-blue-100 to-blue-200 dark:border-neutral-800 dark:bg-linear-to-br dark:from-neutral-900 dark:to-neutral-800 border border-slate-400 rounded-md p-1'>
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className='flex items-center justify-center bg-none border-none  dark:text-slate-300 w-6 h-6 text-lg cursor-pointer transition-colors duration-300 hover:bg-slate-500 hover:text-white'
                  aria-label='Decrease quantity'
                >
                  −
                </button>
                <span className='min-w-6 text-center text-sm font-semibold'>
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className='flex items-center justify-center bg-none border-none dark:text-slate-300 w-6 h-6 text-lg cursor-pointer transition-colors duration-300 hover:bg-slate-500 hover:text-white'
                  aria-label='Increase quantity'
                >
                  +
                </button>
              </div>

              <p className='text-lg font-bold text-blue-400 dark:text-yellow-400 whitespace-nowrap m-0'>
                ${(product.price * quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(product.id)}
                className='bg-none border-none dark:text-slate-300 text-lg cursor-pointer p-2 transition-colors hover:text-red-500'
                aria-label={`Remove ${product.title}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className='flex flex-col gap-3 sticky top-20 bg-linear-to-br from-blue-100 to-blue-200 dark:border-neutral-800 dark:bg-linear-to-br dark:from-neutral-900 dark:to-neutral-800 border border-slate-300 rounded-md p-6'>
          <h2 className='text-lg tracking-wide mb-2'>Order Summary</h2>

          <div className='flex justify-between text-lg dark:text-slate-300'>
            <span>Items ({totalItems})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-lg dark:text-slate-300'>
            <span>Shipping</span>
            <span className='text-green-400'>Free</span>
          </div>

          <div className='flex justify-between text-lg font-bold  dark:text-white pt-3 border-t border-t-slate-300 mt-1'>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button className='mt-0.5 p-2 bg-white text-black font-bold text-lg uppercase tracking-wide border-none rounded-md cursor-pointer transition-colors hover:bg-yellow-400'>
            Proceed to Checkout
          </button>

          <Link
            href='/'
            className='items-center uppercase text-lg tracking-wide transition-colors dark:text-white'
          >
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
