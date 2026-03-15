import { CartAction, CartState } from './types';

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existningCartFind = state.items.find(
        (d) => (d.product.id = action.product.id),
      );
      if (existningCartFind) {
        return {
          items: state.items.map((d) =>
            d.product.id === action.product.id
              ? {
                  ...d,
                  quantity: d.quantity + 1,
                }
              : d,
          ),
        };
      }

      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter((d) => d.product.id !== action.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((d) => d.product.id !== action.productId),
        };
      }
      return {
        items: state.items.map((d) =>
          d.product.id == action.productId
            ? { ...d, quantity: action.quantity }
            : d,
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.items };
    default:
      return state;
  }
};
