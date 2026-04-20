import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.product.id === action.product.id);
      if (existing) {
        return state.map(i =>
          i.product.id === action.product.id
            ? { ...i, quantity: Math.min(i.quantity + action.quantity, i.product.stock) }
            : i
        );
      }
      return [...state, { product: action.product, quantity: action.quantity }];
    }
    case 'REMOVE':
      return state.filter(i => i.product.id !== action.id);
    case 'UPDATE':
      return state.map(i =>
        i.product.id === action.id ? { ...i, quantity: action.quantity } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem('cart')) ?? []; } catch { return []; }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, loadCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD', product, quantity });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) dispatch({ type: 'REMOVE', id });
    else dispatch({ type: 'UPDATE', id, quantity });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
