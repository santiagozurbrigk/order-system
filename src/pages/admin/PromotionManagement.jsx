import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPromotionFlyer, updatePromotionFlyer } from '../../data/promotions';

const PromotionManagement = () => {
  const navigate = useNavigate();
  const [flyerData, setFlyerData] = useState(getPromotionFlyer());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: flyerData.title,
    subtitle: flyerData.subtitle,
    description: flyerData.description,
    image: flyerData.image,
    isActive: flyerData.isActive,
    validUntil: flyerData.validUntil,
    buttonText: flyerData.buttonText,
    buttonLink: flyerData.buttonLink
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Crear URL de preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Actualizar el formData con la nueva imagen
      setFormData(prev => ({
        ...prev,
        image: url
      }));
    }
  };

  const removeSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData(prev => ({
      ...prev,
      image: flyerData.image // Volver a la imagen original
    }));
  };

  const handleSave = () => {
    const updatedFlyer = updatePromotionFlyer(formData);
    setFlyerData(updatedFlyer);
    setIsEditing(false);
    alert('Flyer promocional actualizado correctamente');
  };

  const handleCancel = () => {
    // Limpiar archivos seleccionados
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    
    setFormData({
      title: flyerData.title,
      subtitle: flyerData.subtitle,
      description: flyerData.description,
      image: flyerData.image,
      isActive: flyerData.isActive,
      validUntil: flyerData.validUntil,
      buttonText: flyerData.buttonText,
      buttonLink: flyerData.buttonLink
    });
    setIsEditing(false);
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
          <h1 className="text-2xl font-bold" style={{ color: '#7f5539' }}>Gestión de Promociones</h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 border"
          style={{ 
            backgroundColor: isEditing ? '#e6ccb2' : '#ddb892', 
            color: '#7f5539',
            borderColor: '#b08968'
          }}
        >
          {isEditing ? 'Cancelar' : 'Editar Flyer'}
        </button>
      </div>

      <div className="px-4 pb-8">
        {/* Preview del Flyer */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6" style={{ borderColor: '#b08968' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#7f5539' }}>Vista Previa del Flyer</h2>
          
          <div className="relative rounded-lg overflow-hidden shadow-lg border" style={{ borderColor: '#b08968' }}>
            <div className="relative w-full max-w-sm mx-auto h-96 md:h-[500px] lg:h-[600px]">
              <img
                src={flyerData.image}
                alt={flyerData.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Formulario de Edición */}
        {isEditing && (
          <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#b08968' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#7f5539' }}>Editar Flyer Promocional</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                  Imagen del Flyer *
                </label>
                
                {/* Input de archivo */}
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-3 border border-dashed rounded-lg transition-colors duration-200"
                    style={{ 
                      borderColor: '#b08968',
                      backgroundColor: '#e6ccb2',
                      color: '#7f5539'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#ddb892';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#e6ccb2';
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {selectedFile ? selectedFile.name : 'Seleccionar imagen desde tu computadora'}
                  </label>
                </div>

                {/* Preview de la imagen seleccionada */}
                {previewUrl && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2" style={{ color: '#7f5539' }}>Vista previa:</p>
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border" style={{ borderColor: '#b08968' }}>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeSelectedFile}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <p className="text-sm mt-1" style={{ color: '#b08968' }}>
                  Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB. Recomendado: formato vertical (9:16)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#7f5539' }}>
                  Válido Hasta
                </label>
                <input
                  type="date"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: '#e6ccb2',
                    borderColor: '#b08968',
                    color: '#7f5539'
                  }}
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                  style={{ accentColor: '#b08968' }}
                />
                <label className="text-sm font-medium" style={{ color: '#7f5539' }}>
                  Promoción Activa
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  style={{ 
                    backgroundColor: '#ddb892', 
                    color: '#7f5539',
                    border: '2px solid #b08968'
                  }}
                >
                  Guardar Cambios
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
      </div>
    </div>
  );
};

export default PromotionManagement;
