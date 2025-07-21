import React, { useState } from 'react';
import { Share, Copy, Check, Download } from 'lucide-react';

interface LogoCanvasProps {
  selectedColor: string;
}

const LogoCanvas: React.FC<LogoCanvasProps> = ({ selectedColor }) => {
  const [pathColors, setPathColors] = useState({
    path1: '#FE11C5',
    path2: '#FE11C5',
    path3: '#FE11C5',
    path4: '#FE11C5',
  });

  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handlePathClick = (pathId: string) => {
    setPathColors(prev => ({
      ...prev,
      [pathId]: selectedColor
    }));
  };

  const resetColors = () => {
    setPathColors({
      path1: '#FE11C5',
      path2: '#FE11C5',
      path3: '#FE11C5',
      path4: '#FE11C5',
    });
  };

  const getPathOpacity = (pathId: string) => {
    if (pathId === 'path2' || pathId === 'path4') return 0.4;
    return 1;
  };

  const getPathStyle = (pathId: string) => ({
    fill: pathColors[pathId as keyof typeof pathColors],
    opacity: getPathOpacity(pathId),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    filter: hoveredPath === pathId ? 'brightness(1.1) drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
    transform: hoveredPath === pathId ? 'scale(1.02)' : 'scale(1)',
    transformOrigin: 'center',
  });

  const hasCustomColors = () => {
    return Object.values(pathColors).some(color => color !== '#FE11C5');
  };

  const shareOnX = () => {
    const colors = Object.values(pathColors).join(', ');
    const tweetText = `🎨 Just created my own version of the Succinct logo!

Try creating your own colorful version at: 

https://succinctcolors.netlify.app/

Gprove @Succinctlabs #CreativeChallenge`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const copyLogoToClipboard = async () => {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size as 1:1 square (higher resolution for better quality)
      const scale = 3; // 3x resolution for crisp image
      const size = 600 * scale; // 1800x1800 final resolution
      canvas.width = size;
      canvas.height = size;
      
      // Create SVG string with current colors
      const svgString = `<svg width="216" height="309" viewBox="0 0 72 103" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M71.2968 10.2937V30.8773L53.4726 41.1672V20.5836L35.6484 30.8736V51.4572L17.8242 41.1672V20.5836L53.4726 0L71.2968 10.2937Z" fill="${pathColors.path1}"/>
<path opacity="0.4" d="M35.6484 51.4579L17.8242 61.7478L0 51.4579L17.8242 41.168L35.6484 51.4579Z" fill="${pathColors.path2}"/>
<path d="M53.4725 61.747V82.3306L17.8242 102.914L0 92.6205V72.0369L17.8242 61.747V82.3306L35.6484 72.0407V51.457L53.4725 61.747Z" fill="${pathColors.path3}"/>
<path opacity="0.4" d="M71.2968 51.4579L53.4726 61.7478L35.6484 51.4579L53.4726 41.168L71.2968 51.4579Z" fill="${pathColors.path4}"/>
</svg>`;

      // Create blob from SVG
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      // Create image element
      const img = new Image();
      
      img.onload = async () => {
        // Fill entire canvas with white background
        ctx!.fillStyle = '#ffffff';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions to center the logo in the square
        const logoWidth = 216 * scale;
        const logoHeight = 309 * scale;
        const x = (canvas.width - logoWidth) / 2;
        const y = (canvas.height - logoHeight) / 2;
        
        // Draw the SVG image centered in the square
        ctx!.drawImage(img, x, y, logoWidth, logoHeight);
        
        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              // Copy image to clipboard
              await navigator.clipboard.write([
                new ClipboardItem({
                  'image/png': blob
                })
              ]);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch (clipboardError) {
              console.error('Clipboard write failed:', clipboardError);
              // Fallback: download the image
              const downloadUrl = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = downloadUrl;
              a.download = 'succinct-logo-custom.png';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(downloadUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          }
        }, 'image/png', 0.95);
        
        URL.revokeObjectURL(url);
      };
      
      img.onerror = () => {
        console.error('Failed to load SVG image');
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
      
    } catch (err) {
      console.error('Failed to copy logo:', err);
      // Fallback: show error message
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadLogo = async () => {
    setDownloading(true);
    
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size as 1:1 square (higher resolution for better quality)
      const scale = 3; // 3x resolution for crisp image
      const size = 600 * scale; // 1800x1800 final resolution
      canvas.width = size;
      canvas.height = size;
      
      // Create SVG string with current colors
      const svgString = `<svg width="216" height="309" viewBox="0 0 72 103" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M71.2968 10.2937V30.8773L53.4726 41.1672V20.5836L35.6484 30.8736V51.4572L17.8242 41.1672V20.5836L53.4726 0L71.2968 10.2937Z" fill="${pathColors.path1}"/>
<path opacity="0.4" d="M35.6484 51.4579L17.8242 61.7478L0 51.4579L17.8242 41.168L35.6484 51.4579Z" fill="${pathColors.path2}"/>
<path d="M53.4725 61.747V82.3306L17.8242 102.914L0 92.6205V72.0369L17.8242 61.747V82.3306L35.6484 72.0407V51.457L53.4725 61.747Z" fill="${pathColors.path3}"/>
<path opacity="0.4" d="M71.2968 51.4579L53.4726 61.7478L35.6484 51.4579L53.4726 41.168L71.2968 51.4579Z" fill="${pathColors.path4}"/>
</svg>`;

      // Create blob from SVG
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      // Create image element
      const img = new Image();
      
      img.onload = async () => {
        // Fill entire canvas with white background
        ctx!.fillStyle = '#ffffff';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions to center the logo in the square
        const logoWidth = 216 * scale;
        const logoHeight = 309 * scale;
        const x = (canvas.width - logoWidth) / 2;
        const y = (canvas.height - logoHeight) / 2;
        
        // Draw the SVG image centered in the square
        ctx!.drawImage(img, x, y, logoWidth, logoHeight);
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'succinct-logo-custom.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
          }
          setDownloading(false);
        }, 'image/png', 0.95);
        
        URL.revokeObjectURL(url);
      };
      
      img.onerror = () => {
        console.error('Failed to load SVG image for download');
        URL.revokeObjectURL(url);
        setDownloading(false);
      };
      
      img.src = url;
      
    } catch (err) {
      console.error('Failed to download logo:', err);
      setDownloading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 flex items-center justify-center">
          <svg 
            width="216" 
            height="309" 
            viewBox="0 0 72 103" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <path
              d="M71.2968 10.2937V30.8773L53.4726 41.1672V20.5836L35.6484 30.8736V51.4572L17.8242 41.1672V20.5836L53.4726 0L71.2968 10.2937Z"
              style={getPathStyle('path1')}
              onClick={() => handlePathClick('path1')}
              onMouseEnter={() => setHoveredPath('path1')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M35.6484 51.4579L17.8242 61.7478L0 51.4579L17.8242 41.168L35.6484 51.4579Z"
              style={getPathStyle('path2')}
              onClick={() => handlePathClick('path2')}
              onMouseEnter={() => setHoveredPath('path2')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M53.4725 61.747V82.3306L17.8242 102.914L0 92.6205V72.0369L17.8242 61.747V82.3306L35.6484 72.0407V51.457L53.4725 61.747Z"
              style={getPathStyle('path3')}
              onClick={() => handlePathClick('path3')}
              onMouseEnter={() => setHoveredPath('path3')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M71.2968 51.4579L53.4726 61.7478L35.6484 51.4579L53.4726 41.168L71.2968 51.4579Z"
              style={getPathStyle('path4')}
              onClick={() => handlePathClick('path4')}
              onMouseEnter={() => setHoveredPath('path4')}
              onMouseLeave={() => setHoveredPath(null)}
            />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-600 text-sm">
          Click on different parts of the Succinct logo to color them
        </p>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetColors}
            className="px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors border border-blue-200 rounded-lg hover:bg-blue-50"
          >
            Reset Colors
          </button>
          
          {hasCustomColors() && (
            <>
              <button
                onClick={copyLogoToClipboard}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                  copied 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Logo'}
              </button>
              
              <button
                onClick={downloadLogo}
                disabled={downloading}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                  downloading
                    ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Download className="w-4 h-4" />
                {downloading ? 'Downloading...' : 'Download'}
              </button>
              
              <button
                onClick={shareOnX}
                className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Share className="w-4 h-4" />
                Share on X
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoCanvas;