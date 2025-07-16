
import { Link } from 'react-router-dom';

const HomePage = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '4rem 2rem',
    },
    title: {
      fontSize: '3rem',
      color: '#6F4E37',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#333',
      maxWidth: '600px',
      margin: '1rem auto 2rem',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Cafe Chinchina</h1>
      <p style={styles.subtitle}>
        Experience the finest coffee, crafted with passion and tradition. Explore our menu of delightful products.
      </p>
      <Link to="/products" className="btn btn-primary">
        View Our Products
      </Link>
    </div>
  );
};

export default HomePage;
