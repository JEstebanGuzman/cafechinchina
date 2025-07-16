
import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getWhatsAppCheckoutUrl: () => string;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.Id === product.Id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.Id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.Id === productId ? { ...item, quantity } : item))
    );
  };
  
  const clearCart = () => {
      setCart([]);
  }

  const getWhatsAppCheckoutUrl = () => {
    const phoneNumber = '573053488154'; // REPLACE WITH YOUR WHATSAPP BUSINESS NUMBER
    let message = 'Hola Cafe Chinchina, quisiera hacer un pedido:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = Number(item.Precio) * item.quantity;
        message += `${item.quantity}x ${item.Nombre} - $${itemTotal.toFixed(2)}\n`;
        total += itemTotal;
    });

    message += `\n*Total: $${total.toFixed(2)}*`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getWhatsAppCheckoutUrl }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};