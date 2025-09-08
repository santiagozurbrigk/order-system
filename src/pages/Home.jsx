import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FloatingCartButton from '../components/FloatingCartButton';
import PromotionFlyer from '../components/PromotionFlyer';
import { getAllProducts, getProductsByCategory } from '../data/menu';
import { getCategories } from '../data/categories';
import { getPromotionFlyer } from '../data/promotions';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const categories = getCategories();
  const promotionFlyer = getPromotionFlyer();

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

  const handleCartClick = () => {
    navigate('/cart', { state: { cartItems } });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ede0d4' }}>
      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
        {/* Promotion Flyer */}
        <PromotionFlyer flyerData={promotionFlyer} />
        <div className="space-y-12">
          {/* Categorías dinámicas */}
          {categories.map(category => {
            const categoryProducts = getProductsByCategory(category.id);
            
            if (categoryProducts.length === 0) return null;
            
            return (
              <section key={category.id}>
                <h2 className="text-2xl font-medium mb-6 text-center" style={{ color: '#7f5539' }}>
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-center mb-6" style={{ color: '#b08968' }}>
                    {category.description}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button */}
      <FloatingCartButton 
        cartItems={cartItems} 
        onCartClick={handleCartClick} 
      />
    </div>
  );
};

export default Home;
