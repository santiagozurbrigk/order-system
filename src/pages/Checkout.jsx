import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });
  const [errors, setErrors] = useState({});

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Ingresa un teléfono válido';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate('/order-summary', { 
        state: { 
          cartItems, 
          customerData: formData,
          total: total + 2
        } 
      });
    }
  };

  const handleBack = () => {
    navigate('/cart', { state: { cartItems } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ede0d4' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#7f5539' }}>No hay productos en el carrito</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg font-semibold transition-colors duration-200 border"
            style={{ 
              backgroundColor: '#ddb892', 
              color: '#7f5539',
              borderColor: '#b08968'
            }}
          >
            Volver al Menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ede0d4' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 py-4 px-4 flex items-center justify-between" style={{ backgroundColor: '#ede0d4' }}>
        <button
          onClick={handleBack}
          className="flex items-center space-x-2"
          style={{ color: '#7f5539' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Volver</span>
        </button>
        <h1 className="text-xl font-bold" style={{ color: '#7f5539' }}>Finalizar Pedido</h1>
        <div className="w-16"></div>
      </div>

      <div className="px-4 pb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#b08968' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#7f5539' }}>Información del Cliente</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: '#e6ccb2',
                    borderColor: errors.firstName ? '#dc2626' : '#b08968',
                    color: '#7f5539'
                  }}
                  placeholder="Tu nombre"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                  Apellido *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: '#e6ccb2',
                    borderColor: errors.lastName ? '#dc2626' : '#b08968',
                    color: '#7f5539'
                  }}
                  placeholder="Tu apellido"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: '#e6ccb2',
                  borderColor: errors.phone ? '#dc2626' : '#b08968',
                  color: '#7f5539'
                }}
                placeholder="Tu número de teléfono"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                Dirección de entrega *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: '#e6ccb2',
                  borderColor: errors.address ? '#dc2626' : '#b08968',
                  color: '#7f5539'
                }}
                placeholder="Dirección completa para la entrega"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#b08968' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#7f5539' }}>Método de Pago</h2>
            
            <div className="space-y-3">
              <label className="flex items-center p-3 rounded-lg border cursor-pointer" style={{ borderColor: '#b08968' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleInputChange}
                  className="mr-3"
                  style={{ accentColor: '#b08968' }}
                />
                <div>
                  <span className="font-medium" style={{ color: '#7f5539' }}>Efectivo</span>
                  <p className="text-sm" style={{ color: '#b08968' }}>Paga en efectivo al recibir tu pedido</p>
                </div>
              </label>

              <label className="flex items-center p-3 rounded-lg border cursor-pointer" style={{ borderColor: '#b08968' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={formData.paymentMethod === 'transfer'}
                  onChange={handleInputChange}
                  className="mr-3"
                  style={{ accentColor: '#b08968' }}
                />
                <div>
                  <span className="font-medium" style={{ color: '#7f5539' }}>Transferencia</span>
                  <p className="text-sm" style={{ color: '#b08968' }}>Paga por transferencia bancaria</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#b08968' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#7f5539' }}>Resumen del Pedido</h2>
            
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium" style={{ color: '#7f5539' }}>{item.quantity}x</span>
                    <span style={{ color: '#b08968' }}>{item.name}</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#7f5539' }}>${item.price * item.quantity}</span>
                </div>
              ))}
              
              <div className="border-t pt-3 mt-3" style={{ borderColor: '#b08968' }}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg" style={{ color: '#7f5539' }}>Total</span>
                  <span className="font-bold text-lg" style={{ color: '#7f5539' }}>${total + 2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-lg font-bold text-lg transition-colors duration-200"
            style={{ 
              backgroundColor: '#ddb892', 
              color: '#7f5539',
              border: '2px solid #b08968'
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
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
