import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Datos de ejemplo para los pedidos
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'AB001',
      customer: 'Juan Pérez',
      phone: '1234567890',
      items: [
        { name: 'Clásica Ala-Burguer', quantity: 2, price: 1200 },
        { name: 'Papas Fritas', quantity: 1, price: 500 }
      ],
      total: 2900,
      status: 'pending',
      createdAt: '2024-01-15 14:30',
      address: 'Av. Principal 123, Centro'
    },
    {
      id: 2,
      orderNumber: 'AB002',
      customer: 'María García',
      phone: '0987654321',
      items: [
        { name: 'Doble Carne', quantity: 1, price: 1800 },
        { name: 'Combo Clásico', quantity: 1, price: 1800 }
      ],
      total: 3600,
      status: 'preparing',
      createdAt: '2024-01-15 14:15',
      address: 'Calle Secundaria 456, Norte'
    },
    {
      id: 3,
      orderNumber: 'AB003',
      customer: 'Carlos López',
      phone: '1122334455',
      items: [
        { name: 'Pollo Crispy', quantity: 1, price: 1400 }
      ],
      total: 1400,
      status: 'ready',
      createdAt: '2024-01-15 13:45',
      address: 'Plaza Central 789, Sur'
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'Todos', color: '#b08968' },
    { value: 'pending', label: 'Pendiente', color: '#f59e0b' },
    { value: 'preparing', label: 'En preparación', color: '#3b82f6' },
    { value: 'ready', label: 'Listo', color: '#10b981' },
    { value: 'delivered', label: 'Entregado', color: '#6b7280' }
  ];

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : '#b08968';
  };

  const getStatusLabel = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : status;
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ede0d4' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 py-4 px-4 flex items-center justify-between" style={{ backgroundColor: '#ede0d4' }}>
        <h1 className="text-2xl font-bold" style={{ color: '#7f5539' }}>Panel de Administración</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/categories')}
            className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 border"
            style={{ 
              backgroundColor: '#ddb892', 
              color: '#7f5539',
              borderColor: '#b08968'
            }}
          >
            Categorías
          </button>
          <button
            onClick={() => navigate('/admin/menu')}
            className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 border"
            style={{ 
              backgroundColor: '#ddb892', 
              color: '#7f5539',
              borderColor: '#b08968'
            }}
          >
            Gestionar Menú
          </button>
          <button
            onClick={() => navigate('/admin/promotions')}
            className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 border"
            style={{ 
              backgroundColor: '#ddb892', 
              color: '#7f5539',
              borderColor: '#b08968'
            }}
          >
            Promociones
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 border"
            style={{ 
              backgroundColor: '#e6ccb2', 
              color: '#7f5539',
              borderColor: '#b08968'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="px-4 pb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {statusOptions.slice(1).map((status) => (
            <div key={status.value} className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#b08968' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: '#b08968' }}>{status.label}</p>
                  <p className="text-2xl font-bold" style={{ color: '#7f5539' }}>
                    {orders.filter(order => order.status === status.value).length}
                  </p>
                </div>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: status.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 shadow-sm border mb-6" style={{ borderColor: '#b08968' }}>
          <h2 className="text-lg font-semibold mb-3" style={{ color: '#7f5539' }}>Filtrar Pedidos</h2>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedStatus === status.value ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedStatus === status.value ? status.color : '#e6ccb2',
                  color: selectedStatus === status.value ? 'white' : '#7f5539',
                  border: `1px solid ${status.color}`
                }}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border" style={{ borderColor: '#b08968' }}>
              <p className="text-lg" style={{ color: '#b08968' }}>No hay pedidos con el filtro seleccionado</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#b08968' }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: '#7f5539' }}>Pedido #{order.orderNumber}</h3>
                    <p className="text-sm" style={{ color: '#b08968' }}>{order.createdAt}</p>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: getStatusColor(order.status) + '20',
                      color: getStatusColor(order.status)
                    }}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#7f5539' }}>Cliente</h4>
                    <p style={{ color: '#b08968' }}>{order.customer}</p>
                    <p style={{ color: '#b08968' }}>{order.phone}</p>
                    <p style={{ color: '#b08968' }}>{order.address}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#7f5539' }}>Productos</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} style={{ color: '#b08968' }}>
                          {item.quantity}x {item.name} - ${item.price}
                        </p>
                      ))}
                    </div>
                    <p className="font-bold text-lg mt-2" style={{ color: '#7f5539' }}>
                      Total: ${order.total}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {statusOptions.slice(1).map((status) => (
                    <button
                      key={status.value}
                      onClick={() => updateOrderStatus(order.id, status.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        order.status === status.value ? 'ring-2' : ''
                      }`}
                      style={{
                        backgroundColor: order.status === status.value ? status.color : '#e6ccb2',
                        color: order.status === status.value ? 'white' : '#7f5539',
                        border: `1px solid ${status.color}`,
                        ringColor: status.color
                      }}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
