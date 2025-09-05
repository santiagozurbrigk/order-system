import React from 'react';

const Navbar = ({ cartItems, onCartClick }) => {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white text-slate-700 border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-medium text-slate-800">Ala-Burguer</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 text-sm border border-slate-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
