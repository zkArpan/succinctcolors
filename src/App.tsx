import React, { useState } from 'react';
import Header from './components/Header';
import LogoCanvas from './components/LogoCanvas';
import ColorPicker from './components/ColorPicker';
import LoginModal from './components/LoginModal';
import LogoGallery from './components/LogoGallery';

function App() {
  const [selectedColor, setSelectedColor] = useState('#FE11C5');
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem('inco_user') || null;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    // This will be handled by the LogoCanvas component
    window.location.reload();
  };

  const handleLogin = async (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('inco_user', username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('inco_user');
  };

  const handleSaveSuccess = () => {
    // Refresh the gallery to show the new logo
    setGalleryKey(prev => prev + 1);
  };

  const handleColorPickerAction = () => {
    if (!currentUser) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Header 
          currentUser={currentUser}
          onLogin={() => setShowLoginModal(true)}
          onLogout={handleLogout}
        />
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Logo Canvas */}
          <div className="flex justify-center">
            <LogoCanvas 
              selectedColor={selectedColor}
              currentUser={currentUser}
              onSaveSuccess={handleSaveSuccess}
            />
          </div>

          {/* Color Picker */}
          <div className="flex justify-center lg:justify-start">
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              onReset={handleReset}
              onAction={handleColorPickerAction}
            />
          </div>
        </div>

        {/* Logo Gallery */}
        <LogoGallery key={galleryKey} />

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      </div>
    </div>
  );
}

export default App;