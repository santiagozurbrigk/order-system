import React from 'react';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="bg-white text-slate-700 w-full max-w-md h-full overflow-y-auto border-l border-slate-200 shadow-lg">
        <div className="p-4 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-slate-800">Tu Pedido</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 flex-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <p className="text-slate-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-slate-50 rounded-md p-3 border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-slate-800 text-sm">{item.name}</h3>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 w-7 h-7 rounded flex items-center justify-center transition-colors text-sm"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-slate-700 font-medium w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 w-7 h-7 rounded flex items-center justify-center transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-slate-700 font-semibold">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-medium text-slate-700">Total:</span>
              <span className="text-xl font-semibold text-slate-800">${total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-md font-medium transition-colors duration-200 border border-slate-200"
            >
              Proceder al Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
