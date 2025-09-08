import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/LoadingAnimation';

// Client Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import MenuManagement from './pages/admin/MenuManagement';
import PromotionManagement from './pages/admin/PromotionManagement';
import CategoryManagement from './pages/admin/CategoryManagement';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si ya se mostró la animación en esta sesión
    const hasShownAnimation = sessionStorage.getItem('hasShownLoadingAnimation');
    
    if (hasShownAnimation) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingFinish = () => {
    setIsLoading(false);
    // Marcar que ya se mostró la animación en esta sesión
    sessionStorage.setItem('hasShownLoadingAnimation', 'true');
  };

  if (isLoading) {
    return <LoadingAnimation onFinish={handleLoadingFinish} />;
  }

  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<MenuManagement />} />
        <Route path="/admin/promotions" element={<PromotionManagement />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
      </Routes>
    </Router>
  );
}

export default App;