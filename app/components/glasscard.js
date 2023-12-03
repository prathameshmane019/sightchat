// components/GlassCard.js
import React from 'react';

const GlassCard = ({ children }) => {
  return (
    <div className="backdrop-filter backdrop-blur-xs bg-white bg-opacity-10 p-6 rounded-md shadow-md">
      {children}
    </div>
  );
};

export default GlassCard;
