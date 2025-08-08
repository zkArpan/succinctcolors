import React, { useState } from 'react';
import { Share, Copy, Check, Download } from 'lucide-react';

interface LogoCanvasProps {
  selectedColor: string;
}

const LogoCanvas: React.FC<LogoCanvasProps> = ({ selectedColor }) => {
  const [pathColors, setPathColors] = useState({
    background: '#3673F5',
    text: '#3673F5',
    line1: '#FFFFFF',
    line2: '#FFFFFF',
    line3: '#FFFFFF',
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
      background: '#3673F5',
      text: '#3673F5',
      line1: '#FFFFFF',
      line2: '#FFFFFF',
      line3: '#FFFFFF',
    });
  };

  const getPathStyle = (pathId: string) => ({
    fill: pathColors[pathId as keyof typeof pathColors],
    opacity: 1,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    filter: hoveredPath === pathId ? 'brightness(1.1) drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
    transform: hoveredPath === pathId ? 'scale(1.02)' : 'scale(1)',
    transformOrigin: 'center',
  });

  const hasCustomColors = () => {
    return pathColors.background !== '#3673F5' || 
           pathColors.text !== '#3673F5' || 
           pathColors.line1 !== '#FFFFFF' || 
           pathColors.line2 !== '#FFFFFF' || 
           pathColors.line3 !== '#FFFFFF';
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
      const svgString = `<svg width="738" height="248" viewBox="0 0 738 248" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M287.295 175.68V72H309.268V175.68H287.295Z" fill="${pathColors.text}"/>
<path d="M338.834 175.68V72H361.812L419.689 141.12V72H442.237V175.68H419.258L361.094 106.272V175.68H338.834Z" fill="${pathColors.text}"/>
<path d="M496.815 175.68C492.89 175.68 489.299 174.72 486.044 172.8C482.885 170.88 480.347 168.336 478.432 165.168C476.518 161.904 475.56 158.304 475.56 154.368V93.312C475.56 89.376 476.518 85.824 478.432 82.656C480.347 79.392 482.885 76.8 486.044 74.88C489.299 72.96 492.89 72 496.815 72H578.676V94.464H502.56C501.028 94.464 499.831 94.848 498.969 95.616C498.204 96.384 497.821 97.584 497.821 99.216V148.464C497.821 150 498.204 151.2 498.969 152.064C499.831 152.832 501.028 153.216 502.56 153.216H578.676V175.68H496.815Z" fill="${pathColors.text}"/>
<path d="M631.852 175.68C628.022 175.68 624.48 174.72 621.224 172.8C617.969 170.88 615.384 168.288 613.469 165.024C611.554 161.76 610.597 158.208 610.597 154.368V93.312C610.597 89.376 611.554 85.824 613.469 82.656C615.384 79.392 617.969 76.8 621.224 74.88C624.48 72.96 628.022 72 631.852 72H692.745C696.575 72 700.069 72.96 703.229 74.88C706.484 76.8 709.069 79.392 710.984 82.656C712.995 85.824 714 89.376 714 93.312V154.368C714 158.208 712.995 161.76 710.984 165.024C709.069 168.288 706.484 170.88 703.229 172.8C700.069 174.72 696.575 175.68 692.745 175.68H631.852ZM632.857 153.216H691.452V94.464H632.857V153.216Z" fill="${pathColors.text}"/>
<path d="M24 56C24 38.3269 38.2886 24 55.9145 24H191.551C209.177 24 223.466 38.3269 223.466 56V192C223.466 209.673 209.177 224 191.551 224H55.9145C38.2886 224 24 209.673 24 192V56Z" fill="${pathColors.background}"/>
<path d="M61.8986 162L82.0047 86H103.786L83.6802 162H61.8986Z" fill="${pathColors.line1}"/>
<path d="M103.786 162L123.893 86H145.674L125.568 162H103.786Z" fill="${pathColors.line2}"/>
<path d="M145.674 162L165.78 86H187.562L167.456 162H145.674Z" fill="${pathColors.line3}"/>
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
        const logoWidth = 738 * scale;
        const logoHeight = 248 * scale;
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
      const svgString = `<svg width="738" height="248" viewBox="0 0 738 248" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M287.295 175.68V72H309.268V175.68H287.295Z" fill="${pathColors.text}"/>
<path d="M338.834 175.68V72H361.812L419.689 141.12V72H442.237V175.68H419.258L361.094 106.272V175.68H338.834Z" fill="${pathColors.text}"/>
<path d="M496.815 175.68C492.89 175.68 489.299 174.72 486.044 172.8C482.885 170.88 480.347 168.336 478.432 165.168C476.518 161.904 475.56 158.304 475.56 154.368V93.312C475.56 89.376 476.518 85.824 478.432 82.656C480.347 79.392 482.885 76.8 486.044 74.88C489.299 72.96 492.89 72 496.815 72H578.676V94.464H502.56C501.028 94.464 499.831 94.848 498.969 95.616C498.204 96.384 497.821 97.584 497.821 99.216V148.464C497.821 150 498.204 151.2 498.969 152.064C499.831 152.832 501.028 153.216 502.56 153.216H578.676V175.68H496.815Z" fill="${pathColors.text}"/>
<path d="M631.852 175.68C628.022 175.68 624.48 174.72 621.224 172.8C617.969 170.88 615.384 168.288 613.469 165.024C611.554 161.76 610.597 158.208 610.597 154.368V93.312C610.597 89.376 611.554 85.824 613.469 82.656C615.384 79.392 617.969 76.8 621.224 74.88C624.48 72.96 628.022 72 631.852 72H692.745C696.575 72 700.069 72.96 703.229 74.88C706.484 76.8 709.069 79.392 710.984 82.656C712.995 85.824 714 89.376 714 93.312V154.368C714 158.208 712.995 161.76 710.984 165.024C709.069 168.288 706.484 170.88 703.229 172.8C700.069 174.72 696.575 175.68 692.745 175.68H631.852ZM632.857 153.216H691.452V94.464H632.857V153.216Z" fill="${pathColors.text}"/>
<path d="M24 56C24 38.3269 38.2886 24 55.9145 24H191.551C209.177 24 223.466 38.3269 223.466 56V192C223.466 209.673 209.177 224 191.551 224H55.9145C38.2886 224 24 209.673 24 192V56Z" fill="${pathColors.background}"/>
<path d="M61.8986 162L82.0047 86H103.786L83.6802 162H61.8986Z" fill="${pathColors.line1}"/>
<path d="M103.786 162L123.893 86H145.674L125.568 162H103.786Z" fill="${pathColors.line2}"/>
<path d="M145.674 162L165.78 86H187.562L167.456 162H145.674Z" fill="${pathColors.line3}"/>
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
        const logoWidth = 738 * scale;
        const logoHeight = 248 * scale;
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
            width="369" 
            height="124" 
            viewBox="0 0 738 248" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <path
              d="M287.295 175.68V72H309.268V175.68H287.295Z"
              style={getPathStyle('text')}
              onClick={() => handlePathClick('text')}
              onMouseEnter={() => setHoveredPath('text')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M338.834 175.68V72H361.812L419.689 141.12V72H442.237V175.68H419.258L361.094 106.272V175.68H338.834Z"
              style={getPathStyle('text')}
              onClick={() => handlePathClick('text')}
              onMouseEnter={() => setHoveredPath('text')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M496.815 175.68C492.89 175.68 489.299 174.72 486.044 172.8C482.885 170.88 480.347 168.336 478.432 165.168C476.518 161.904 475.56 158.304 475.56 154.368V93.312C475.56 89.376 476.518 85.824 478.432 82.656C480.347 79.392 482.885 76.8 486.044 74.88C489.299 72.96 492.89 72 496.815 72H578.676V94.464H502.56C501.028 94.464 499.831 94.848 498.969 95.616C498.204 96.384 497.821 97.584 497.821 99.216V148.464C497.821 150 498.204 151.2 498.969 152.064C499.831 152.832 501.028 153.216 502.56 153.216H578.676V175.68H496.815Z"
              style={getPathStyle('text')}
              onClick={() => handlePathClick('text')}
              onMouseEnter={() => setHoveredPath('text')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M631.852 175.68C628.022 175.68 624.48 174.72 621.224 172.8C617.969 170.88 615.384 168.288 613.469 165.024C611.554 161.76 610.597 158.208 610.597 154.368V93.312C610.597 89.376 611.554 85.824 613.469 82.656C615.384 79.392 617.969 76.8 621.224 74.88C624.48 72.96 628.022 72 631.852 72H692.745C696.575 72 700.069 72.96 703.229 74.88C706.484 76.8 709.069 79.392 710.984 82.656C712.995 85.824 714 89.376 714 93.312V154.368C714 158.208 712.995 161.76 710.984 165.024C709.069 168.288 706.484 170.88 703.229 172.8C700.069 174.72 696.575 175.68 692.745 175.68H631.852ZM632.857 153.216H691.452V94.464H632.857V153.216Z"
              style={getPathStyle('text')}
              onClick={() => handlePathClick('text')}
              onMouseEnter={() => setHoveredPath('text')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M24 56C24 38.3269 38.2886 24 55.9145 24H191.551C209.177 24 223.466 38.3269 223.466 56V192C223.466 209.673 209.177 224 191.551 224H55.9145C38.2886 224 24 209.673 24 192V56Z"
              style={getPathStyle('background')}
              onClick={() => handlePathClick('background')}
              onMouseEnter={() => setHoveredPath('background')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M61.8986 162L82.0047 86H103.786L83.6802 162H61.8986Z"
              style={getPathStyle('line1')}
              onClick={() => handlePathClick('line1')}
              onMouseEnter={() => setHoveredPath('line1')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M103.786 162L123.893 86H145.674L125.568 162H103.786Z"
              style={getPathStyle('line2')}
              onClick={() => handlePathClick('line2')}
              onMouseEnter={() => setHoveredPath('line2')}
              onMouseLeave={() => setHoveredPath(null)}
            />
            <path
              d="M145.674 162L165.78 86H187.562L167.456 162H145.674Z"
              style={getPathStyle('line3')}
              onClick={() => handlePathClick('line3')}
              onMouseEnter={() => setHoveredPath('line3')}
              onMouseLeave={() => setHoveredPath(null)}
            />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-600 text-sm">
          Click on different parts of the INCO logo to color them
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