import { IconType } from 'react-icons';

export type THEME_TYPES = 'light' | 'dark';

export type SidebarNavItem = {
  id: string | number;
  path: string;
  title: string;
  icon: IconType; // ← IconType, not ReactNode
};

export interface ReusableErrMsgProps {
  errMsg: string;
}

// api types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  rating: number;
  stock: number;
  brand?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface CartItem {
  product: Product;
  quantity: number;
}

// cart context value
export interface CartContextValue {
  totalItems: number;
  totalPrice: number;
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: Product['id']) => void;
  updateQuantity: (productId: Product['id'], quantity: number) => void;
  clearCart: () => void;
}

//state management types
export interface CartState {
  items: CartItem[];
}
export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };
