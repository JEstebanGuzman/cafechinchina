
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* A footer could be added here */}
    </>
  );
};

export default Layout;
