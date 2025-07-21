import React, { useState } from 'react';
import Header from './components/Header';
import LogoCanvas from './components/LogoCanvas';
import ColorPicker from './components/ColorPicker';

function App() {
  const [selectedColor, setSelectedColor] = useState('#FE11C5');

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    // This will be handled by the LogoCanvas component
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Logo Canvas */}
          <div className="flex justify-center">
            <LogoCanvas selectedColor={selectedColor} />
          </div>

          {/* Color Picker */}
          <div className="flex justify-center lg:justify-start">
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Create Your Succinct Masterpiece</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Choose Colors</h4>
                <p className="text-gray-600 text-sm">Select from preset colors or create custom ones</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Paint the Logo</h4>
                <p className="text-gray-600 text-sm">Click on any part of the Succinct logo to apply your color</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Create Art</h4>
                <p className="text-gray-600 text-sm">Experiment with combinations to make your unique design</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-pink-600 font-bold text-lg">4</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Copy & Share</h4>
                <p className="text-gray-600 text-sm">Copy your logo and share on X to invite friends to create their own</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;