import React from 'react';
import { Paintbrush } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Paintbrush className="w-8 h-8 text-pink-500" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Succinct Colors
        </h1>
      </div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Express your creativity with the Succinct logo! Click on different parts and paint them with your favorite colors, then share your unique creation with the world.
      </p>
    </header>
  );
};

export default Header;