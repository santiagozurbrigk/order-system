import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { getAllProducts } from './data/menu';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const products = getAllProducts();

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (orderInfo) => {
    setOrderData(orderInfo);
    setIsCheckoutOpen(false);
    setIsOrderConfirmationOpen(true);
    setCartItems([]); // Limpiar carrito después de confirmar
  };

  const handleNewOrder = () => {
    setIsOrderConfirmationOpen(false);
    setOrderData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        cartItems={cartItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-medium text-slate-800 mb-4">
            Bienvenido a <span className="text-slate-600">Ala-Burguer</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Las mejores hamburguesas artesanales, preparadas con ingredientes frescos y mucho amor
          </p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {/* Hamburguesas */}
          <section>
            <h2 className="text-2xl font-medium text-slate-700 mb-6 text-center">Hamburguesas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(product => product.category === 'hamburguesas').map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>

          {/* Combos */}
          <section>
            <h2 className="text-2xl font-medium text-slate-700 mb-6 text-center">Combos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(product => product.category === 'combos').map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>

          {/* Promociones */}
          <section>
            <h2 className="text-2xl font-medium text-slate-700 mb-6 text-center">Promociones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(product => product.category === 'promociones').map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onConfirmOrder={handleConfirmOrder}
      />

      <OrderConfirmation
        isOpen={isOrderConfirmationOpen}
        onClose={handleNewOrder}
        orderData={orderData}
      />
    </div>
  );
}

export default App;
