import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoadingAnimation from './components/LoadingAnimation';
import Alert from './components/Alert';

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

// Components
import FloatingCartButton from './components/FloatingCartButton';
import ProtectedRoute from './components/ProtectedRoute';

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
    <AppProvider>
      <Router>
        <div className="min-h-screen" style={{ backgroundColor: '#ede0d4' }}>
          {/* Componente de alertas */}
          <Alert />
          
          {/* Botón flotante del carrito */}
          <FloatingCartButton />
          
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
              <ProtectedRoute>
                <MenuManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/promotions" element={
              <ProtectedRoute>
                <PromotionManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/categories" element={
              <ProtectedRoute>
                <CategoryManagement />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;