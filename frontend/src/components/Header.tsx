
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="nav-container">
        <Link to="/" className="logo">
          Cafe Chinchina
        </Link>
        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">
            Cart {cartItemCount > 0 && `(${cartItemCount})`}
          </NavLink>
          {user ? (
            <>
              <span>Hi, {user.Nombre}!</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
