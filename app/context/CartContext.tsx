'use client';
import { CartContextValue, Product } from '../lib/types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { cartReducer } from '../lib/CartReducer';

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = 'cart-list';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  //get local storage items
  useEffect(() => {
    const getCart = localStorage.getItem(CART_STORAGE_KEY);
    if (getCart) {
      const setCartItems = JSON.parse(getCart);
      dispatch({ type: 'LOAD_CART', items: setCartItems });
    }
  }, []);

  //set localstorage
  useEffect(() => {
    if (state.items) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items]);

  const totalItems = state.items.reduce((sum, curr) => sum + curr.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, curr) => sum + curr.product.price * curr.quantity,
    0,
  );
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem: (product: Product) => dispatch({ type: 'ADD_ITEM', product }),
        updateQuantity: (productId: Product['id'], quantity: number) => {
          dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
        },
        removeItem: (productId: Product['id']) =>
          dispatch({ type: 'REMOVE_ITEM', productId }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};
