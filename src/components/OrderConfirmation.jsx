import React from 'react';

const OrderConfirmation = ({ isOpen, onClose, orderData }) => {
  if (!isOpen) return null;

  const generateOrderNumber = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const orderNumber = generateOrderNumber();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-700 w-full max-w-md rounded-md border border-slate-200 shadow-xl">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-slate-800 mb-2">¡Pedido Confirmado!</h2>
          <p className="text-slate-600 mb-4">Tu pedido ha sido recibido correctamente</p>
          
          <div className="bg-slate-50 rounded-md p-4 mb-6 text-left border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-500">Número de Pedido:</span>
              <span className="font-semibold text-slate-700">#{orderNumber}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-500">Cliente:</span>
              <span className="text-slate-800">{orderData.firstName} {orderData.lastName}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-500">Teléfono:</span>
              <span className="text-slate-800">{orderData.phone}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-500">Pago:</span>
              <span className="text-slate-800">
                {orderData.paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}
              </span>
            </div>
            
            <div className="border-t border-slate-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Total:</span>
                <span className="text-lg font-semibold text-slate-800">${orderData.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-md p-4 mb-6">
            <h3 className="font-medium text-slate-700 mb-2">Próximos Pasos:</h3>
            <ul className="text-sm text-slate-600 space-y-1 text-left">
              <li>• Te contactaremos por teléfono para confirmar</li>
              <li>• Tiempo estimado de preparación: 20-30 min</li>
              <li>• Recuerda abonar {orderData.paymentMethod === 'cash' ? 'en efectivo' : 'por transferencia'} antes de retirar</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-md font-medium transition-colors duration-200"
          >
            Hacer Otro Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
