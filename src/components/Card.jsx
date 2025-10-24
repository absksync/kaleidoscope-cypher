import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      )}
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default Card;
