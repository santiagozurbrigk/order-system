import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="rounded-md overflow-hidden transition-colors duration-200 shadow-sm" style={{ backgroundColor: '#ede0d4', border: '1px solid #b08968' }}>
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2" style={{ color: '#7f5539' }}>{product.name}</h3>
        <p className="text-sm mb-3 line-clamp-2" style={{ color: '#b08968' }}>{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold" style={{ color: '#7f5539' }}>${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-2 rounded-md transition-colors duration-200 flex items-center space-x-1 text-sm border"
            style={{ 
              backgroundColor: '#ddb892', 
              color: '#7f5539',
              borderColor: '#b08968'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#b08968';
              e.target.style.color = '#ede0d4';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ddb892';
              e.target.style.color = '#7f5539';
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
