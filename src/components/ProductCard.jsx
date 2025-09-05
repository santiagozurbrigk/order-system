import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-md border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors duration-200 shadow-sm">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-slate-800 mb-2">{product.name}</h3>
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-slate-700">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-md transition-colors duration-200 flex items-center space-x-1 text-sm border border-slate-200"
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
