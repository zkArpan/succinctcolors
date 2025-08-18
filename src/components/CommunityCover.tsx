import React, { useEffect, useState, useRef } from 'react';
import { Users, Sparkles, Download } from 'lucide-react';
import { supabase, UserLogo } from '../lib/supabase';

const CommunityCover: React.FC = () => {
  const [allLogos, setAllLogos] = useState<UserLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string>('');

  useEffect(() => {
    fetchAllLogos();
  }, []);

  useEffect(() => {
    if (allLogos.length > 0) {
      generateCommunityCanvas();
    }
  }, [allLogos]);

  const fetchAllLogos = async () => {
    setIsLoading(true);
    try {
      // Fetch all logos for the cover
      const { data, error } = await supabase
        .from('user_logos')
        .select(`
          *,
          user_profiles (
            x_username
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllLogos(data || []);
    } catch (error) {
      console.error('Error fetching logos for cover:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateLogoSvg = (colors: UserLogo['logo_colors']) => {
    return `<svg width="369" height="124" viewBox="0 0 738 248" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M287.295 175.68V72H309.268V175.68H287.295Z" fill="${colors.letterI}"/>
<path d="M338.834 175.68V72H361.812L419.689 141.12V72H442.237V175.68H419.258L361.094 106.272V175.68H338.834Z" fill="${colors.letterN}"/>
<path d="M496.815 175.68C492.89 175.68 489.299 174.72 486.044 172.8C482.885 170.88 480.347 168.336 478.432 165.168C476.518 161.904 475.56 158.304 475.56 154.368V93.312C475.56 89.376 476.518 85.824 478.432 82.656C480.347 79.392 482.885 76.8 486.044 74.88C489.299 72.96 492.89 72 496.815 72H578.676V94.464H502.56C501.028 94.464 499.831 94.848 498.969 95.616C498.204 96.384 497.821 97.584 497.821 99.216V148.464C497.821 150 498.204 151.2 498.969 152.064C499.831 152.832 501.028 153.216 502.56 153.216H578.676V175.68H496.815Z" fill="${colors.letterC}"/>
<path d="M631.852 175.68C628.022 175.68 624.48 174.72 621.224 172.8C617.969 170.88 615.384 168.288 613.469 165.024C611.554 161.76 610.597 158.208 610.597 154.368V93.312C610.597 89.376 611.554 85.824 613.469 82.656C615.384 79.392 617.969 76.8 621.224 74.88C624.48 72.96 628.022 72 631.852 72H692.745C696.575 72 700.069 72.96 703.229 74.88C706.484 76.8 709.069 79.392 710.984 82.656C712.995 85.824 714 89.376 714 93.312V154.368C714 158.208 712.995 161.76 710.984 165.024C709.069 168.288 706.484 170.88 703.229 172.8C700.069 174.72 696.575 175.68 692.745 175.68H631.852ZM632.857 153.216H691.452V94.464H632.857V153.216Z" fill="${colors.letterO}"/>
<path d="M24 56C24 38.3269 38.2886 24 55.9145 24H191.551C209.177 24 223.466 38.3269 223.466 56V192C223.466 209.673 209.177 224 191.551 224H55.9145C38.2886 224 24 209.673 24 192V56Z" fill="${colors.background}"/>
<path d="M61.8986 162L82.0047 86H103.786L83.6802 162H61.8986Z" fill="${colors.line1}"/>
<path d="M103.786 162L123.893 86H145.674L125.568 162H103.786Z" fill="${colors.line2}"/>
<path d="M145.674 162L165.78 86H187.562L167.456 162H145.674Z" fill="${colors.line3}"/>
</svg>`;
  };

  const generateCommunityCanvas = async () => {
    if (!canvasRef.current || allLogos.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution canvas
    const scale = 2;
    const logoWidth = 184; // Half size for better fit
    const logoHeight = 62;
    const padding = 20;
    const margin = 10;

    // Calculate grid dimensions
    const logosPerRow = Math.ceil(Math.sqrt(allLogos.length));
    const rows = Math.ceil(allLogos.length / logosPerRow);
    
    const canvasWidth = (logoWidth + margin) * logosPerRow + padding * 2;
    const canvasHeight = (logoHeight + margin) * rows + padding * 2 + 100; // Extra space for title

    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.scale(scale, scale);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#f3e8ff'); // purple-50
    gradient.addColorStop(0.5, '#fdf2f8'); // pink-50
    gradient.addColorStop(1, '#eff6ff'); // blue-50
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Add title
    ctx.fillStyle = '#7c3aed'; // purple-600
    ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Community Creations', canvasWidth / 2, 50);

    // Add subtitle
    ctx.fillStyle = '#6b7280'; // gray-500
    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${allLogos.length} Unique INCO Designs`, canvasWidth / 2, 75);

    // Load and draw each logo
    const logoPromises = allLogos.map((logo, index) => {
      return new Promise<void>((resolve) => {
        const svgString = generateLogoSvg(logo.logo_colors);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = () => {
          const row = Math.floor(index / logosPerRow);
          const col = index % logosPerRow;
          
          const x = padding + col * (logoWidth + margin);
          const y = 100 + padding + row * (logoHeight + margin); // 100px offset for title area
          
          // Draw white background for logo
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x - 5, y - 5, logoWidth + 10, logoHeight + 10);
          
          // Add subtle shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 5;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          
          // Draw logo
          ctx.drawImage(img, x, y, logoWidth, logoHeight);
          
          // Reset shadow
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Add username label
          ctx.fillStyle = '#374151'; // gray-700
          ctx.font = '10px system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          const username = logo.user_profiles?.x_username || 'unknown';
          ctx.fillText(`@${username}`, x + logoWidth / 2, y + logoHeight + 15);
          
          URL.revokeObjectURL(url);
          resolve();
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve();
        };
        
        img.src = url;
      });
    });

    // Wait for all logos to load, then convert to data URL
    Promise.all(logoPromises).then(() => {
      const dataUrl = canvas.toDataURL('image/png', 0.95);
      setCanvasDataUrl(dataUrl);
    });
  };

  const downloadCommunityCanvas = () => {
    if (!canvasDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'inco-community-creations.png';
    link.href = canvasDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="mt-6 sm:mt-8 lg:mt-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-600">Creating community canvas...</span>
          </div>
        </div>
      </div>
    );
  }

  if (allLogos.length === 0) {
    return null; // Don't show cover if no logos exist
  }

  return (
    <div className="mt-6 sm:mt-8 lg:mt-12 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 lg:p-8 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Community Canvas
            </h2>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Every unique INCO logo created by our amazing community, beautifully arranged in one masterpiece!
          </p>
          <div className="mt-3 sm:mt-4">
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-1 sm:py-2 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {allLogos.length} Creative{allLogos.length !== 1 ? 's' : ''} Combined
              </span>
            </span>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto mx-auto rounded-lg shadow-sm"
              style={{ display: canvasDataUrl ? 'block' : 'none' }}
            />
            
            {!canvasDataUrl && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <span className="ml-3 text-gray-600">Generating community canvas...</span>
              </div>
            )}
          </div>
          
          {/* Download Button */}
          {canvasDataUrl && (
            <div className="flex justify-center mt-4 sm:mt-6">
              <button
                onClick={downloadCommunityCanvas}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Download Community Canvas</span>
              </button>
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="p-4 sm:p-6 text-center bg-gradient-to-r from-purple-100 to-pink-100">
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            🎨 Your creation could be part of this masterpiece! Design your own INCO logo above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityCover;