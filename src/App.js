import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import ShopsPage from './pages/ShopsPage';
import CartPage from './pages/CartPage';
import SingleShopPage from './pages/SingleShopPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

import { ThemeContext } from './hoc/ThemeProvider';


function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<ShopsPage />} />
          <Route path='shops/:shop' element={<SingleShopPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='*' element={<NotFoundPage />} />         
        </Route>
      </Routes>

    </div>
  );
}

export default App;
