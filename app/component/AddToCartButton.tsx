'use client';
import { useState } from 'react';
import { Product } from '../lib/types';
import { useCart } from '../context/CartContext';

export default function AddToCardButton({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const existingItem = items.find((i) => i.product.id === product.id);
  const handleAdd = () => {
    setIsAdded(true);
    addItem(product);
    setTimeout(() => setIsAdded(false), 1500);
  };
  return (
    <>
      <button
        onClick={handleAdd}
        className={`inline-flex items-center justify-center gap-2 px-2 py-3 bg-yellow-400 text-black font-bold text-sm tracking-wider uppercase rounded-md transition-all duration-200 hover:scale-105 cursor-pointer ${isAdded ? 'bg-green-500 text-white' : ''}`}
        aria-label={`Add ${product.title} to cart`}
      >
        {isAdded ? (
          <>
            <span>✓</span> Added to Cart
          </>
        ) : existingItem ? (
          <>Add Again ({existingItem.quantity} in cart)</>
        ) : (
          <>Add to Cart</>
        )}
      </button>
    </>
  );
}
