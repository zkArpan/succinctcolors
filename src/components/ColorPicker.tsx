import React from 'react';
import { Palette, RotateCcw } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  onReset: () => void;
  onAction: () => boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange, onReset, onAction }) => {
  const presetColors = [
    // Original and vibrant colors
    '#FE11C5', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471',
    
    // Additional vibrant colors
    '#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#607D8B',
    
    // Pastel colors
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E6BAFF',
    '#FFB3E6', '#C9BAFF', '#BAFFFF', '#FFCAB3', '#D4BAFF', '#B3FFB3',
    
    // Dark and sophisticated colors
    '#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7', '#ECF0F1',
    '#1ABC9C', '#16A085', '#F39C12', '#E67E22', '#E74C3C', '#C0392B',
    
    // Neon and electric colors
    '#39FF14', '#FF073A', '#00FFFF', '#FF00FF', '#FFFF00', '#FF4500',
    '#8A2BE2', '#00FF7F', '#DC143C', '#FF1493', '#00CED1', '#FFD700'
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-lg">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Color Picker</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Custom Color Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Color
          </label>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                if (onAction()) {
                  onColorChange(e.target.value);
                }
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            />
            <input
              type="text"
              value={selectedColor}
              onChange={(e) => {
                if (onAction()) {
                  onColorChange(e.target.value);
                }
              }}
              className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="#FE11C5"
            />
          </div>
        </div>

        {/* Preset Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preset Colors
          </label>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 sm:gap-2 max-h-48 sm:max-h-64 overflow-y-auto">
            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => {
                  if (onAction()) {
                    onColorChange(color);
                  }
                }}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md ${
                  selectedColor === color ? 'border-gray-800 ring-2 ring-blue-500' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm sm:text-base font-medium rounded-lg transition-colors duration-200"
        >
          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          Reset to Original
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;