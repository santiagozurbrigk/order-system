import React from 'react';

const PromotionFlyer = ({ flyerData }) => {
  if (!flyerData || !flyerData.isActive) {
    return null;
  }

  return (
    <div className="w-full mb-8">
      <div className="relative rounded-lg overflow-hidden shadow-lg border" style={{ borderColor: '#b08968' }}>
        {/* Imagen del flyer en formato vertical 9:16 */}
        <div className="relative w-full max-w-sm mx-auto h-96 md:h-[500px] lg:h-[600px]">
          <img
            src={flyerData.image}
            alt={flyerData.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionFlyer;
