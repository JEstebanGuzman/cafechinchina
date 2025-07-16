
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div className="product-card">
            <img src={product.ImagenURL} alt={product.Nombre} className="product-image" />
            <div className="product-info">
                <h3>{product.Nombre}</h3>
                <p className="product-price">${Number(product.Precio).toFixed(2)}</p>
                <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    )
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>('/productos');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.Id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;