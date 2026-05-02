import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { CategoryListing } from './pages/CategoryListing';
import { Cart } from './pages/Cart';
import '../styles/index.css';

export function App() {
  const[pageType, setPageType] = useState('tv');
  
  // Инициализируем стейт из sessionStorage
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('techstore_cart');
    return savedCart ? JSON.parse(savedCart) : {}; 
  });

  // Синхронизируем стейт с sessionStorage при каждом изменении
  useEffect(() => {
    sessionStorage.setItem('techstore_cart', JSON.stringify(cart));
  }, [cart]);

  const updateCart = (productId, delta) => {
    setCart(prev => {
      const currentQ = prev[productId] || 0;
      const newQ = currentQ + delta;
      
      const newCart = { ...prev };
      if (newQ <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = newQ;
      }
      return newCart;
    });
  };

  const removeProduct = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <div className="app-wrapper">
      <Header 
        pageType={pageType} 
        setPageType={setPageType} 
        cartItemCount={Object.values(cart).reduce((sum, q) => sum + q, 0)} 
      />
      
      <main className="main-container">
        {pageType !== 'cart' ? (
          <CategoryListing 
            category={pageType} 
            cart={cart} 
            updateCart={updateCart} 
          />
        ) : (
          <Cart 
            cart={cart} 
            updateCart={updateCart} 
            removeProduct={removeProduct} 
            clearCart={clearCart} 
            setPageType={setPageType} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}