import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './hoc/ThemeProvider';
import { CartProvider } from './hoc/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>      
      <CartProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
