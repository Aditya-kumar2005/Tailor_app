import React from 'react';

interface Props {
  title: string;
  value: string | number;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral'; // Optional color prop
}

// Map color prop to Tailwind CSS classes
const colorVariants = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-green-500 text-white',
  accent: 'bg-yellow-500 text-gray-800',
  neutral: 'bg-gray-200 text-gray-700',
};

const DashboardCard: React.FC<Props> = ({ title, value, color = 'primary' }) => {
  const cardColor = colorVariants[color];

  return (
    <div 
      className={`
        p-6 
        rounded-lg 
        shadow-md 
        text-center 
        transition-transform 
        duration-300 
        ease-in-out 
        transform 
        hover:scale-105 
        hover:shadow-xl
        w-full 
        md:w-auto 
        min-w-50 
        ${cardColor}
      `}
    >
      <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl md:text-4xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
