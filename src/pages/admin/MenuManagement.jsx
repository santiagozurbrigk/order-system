import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../data/menu';
import { getCategories } from '../../data/categories';

const MenuManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(getAllProducts());
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: 1,
    image: ''
  });

  const categories = getCategories();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: categories[0]?.id || 1,
      image: ''
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsAddingProduct(true);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryId: product.categoryId,
      image: product.image
    });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Editar producto existente
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                categoryId: parseInt(formData.categoryId),
                image: formData.image
              }
            : product
        )
      );
    } else {
      // Agregar nuevo producto
      const newProduct = {
        id: Date.now(), // ID temporal
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        image: formData.image
      };
      setProducts(prevProducts => [...prevProducts, newProduct]);
    }
    
    setIsAddingProduct(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'hamburguesas',
      image: ''
    });
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'hamburguesas',
      image: ''
    });
  };

  const handleBack = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ede0d4' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 py-4 px-4 flex items-center justify-between" style={{ backgroundColor: '#ede0d4' }}>
        <div className="flex items-center space-x-4">
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
          <h1 className="text-2xl font-bold" style={{ color: '#7f5539' }}>Gestión del Menú</h1>
        </div>
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 border"
          style={{ 
            backgroundColor: '#ddb892', 
            color: '#7f5539',
            borderColor: '#b08968'
          }}
        >
          Agregar Producto
        </button>
      </div>

      <div className="px-4 pb-8">
        {/* Add/Edit Product Form */}
        {isAddingProduct && (
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-6" style={{ borderColor: '#b08968' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#7f5539' }}>
              {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: '#e6ccb2',
                      borderColor: '#b08968',
                      color: '#7f5539'
                    }}
                    placeholder="Ej: Clásica Ala-Burguer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                    Precio *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: '#e6ccb2',
                      borderColor: '#b08968',
                      color: '#7f5539'
                    }}
                    placeholder="1200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: '#e6ccb2',
                    borderColor: '#b08968',
                    color: '#7f5539'
                  }}
                  placeholder="Descripción detallada del producto..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                    Categoría *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: '#e6ccb2',
                      borderColor: '#b08968',
                      color: '#7f5539'
                    }}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                    URL de la Imagen *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: '#e6ccb2',
                      borderColor: '#b08968',
                      color: '#7f5539'
                    }}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  style={{ 
                    backgroundColor: '#ddb892', 
                    color: '#7f5539',
                    border: '2px solid #b08968'
                  }}
                >
                  {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 rounded-lg font-semibold transition-colors duration-200 border"
                  style={{ 
                    backgroundColor: '#e6ccb2', 
                    color: '#7f5539',
                    borderColor: '#b08968'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryProducts = products.filter(product => product.categoryId === category.id);
            
            if (categoryProducts.length === 0) return null;
            
            return (
              <div key={category.id}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#7f5539' }}>
                  {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden" style={{ borderColor: '#b08968' }}>
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#7f5539' }}>{product.name}</h3>
                        <p className="text-sm mb-3 line-clamp-2" style={{ color: '#b08968' }}>{product.description}</p>
                        <p className="text-lg font-bold mb-4" style={{ color: '#7f5539' }}>${product.price}</p>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 px-3 py-2 rounded-lg font-medium transition-colors duration-200 border"
                            style={{ 
                              backgroundColor: '#ddb892', 
                              color: '#7f5539',
                              borderColor: '#b08968'
                            }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 px-3 py-2 rounded-lg font-medium transition-colors duration-200 border"
                            style={{ 
                              backgroundColor: '#fef2f2', 
                              color: '#dc2626',
                              borderColor: '#dc2626'
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
