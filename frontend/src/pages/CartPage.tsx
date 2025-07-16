
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getWhatsAppCheckoutUrl } = useCart();

  const total = cart.reduce((sum, item) => sum + Number(item.Precio) * item.quantity, 0);

  const handleCheckout = () => {
    const url = getWhatsAppCheckoutUrl();
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.Id} className="cart-item">
            <img src={item.ImagenURL} alt={item.Nombre} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.Nombre}</h3>
              <p>${Number(item.Precio).toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => updateQuantity(item.Id, item.quantity - 1)}>-</button>
              <span> {item.quantity} </span>
              <button onClick={() => updateQuantity(item.Id, item.quantity + 1)}>+</button>
              <button onClick={() => removeFromCart(item.Id)} style={{marginLeft: '1rem'}}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Summary</h2>
        <p className="cart-total">Total: ${total.toFixed(2)}</p>
        <button onClick={handleCheckout} className="btn btn-primary">
          Checkout on WhatsApp
        </button>
        <button onClick={clearCart} className="btn" style={{marginLeft: '1rem', background: '#eee'}}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
