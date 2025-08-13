import React, { useEffect, useState } from 'react';
import { Users, Sparkles } from 'lucide-react';
import { supabase, UserLogo } from '../lib/supabase';

const CommunityCover: React.FC = () => {
  const [allLogos, setAllLogos] = useState<UserLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllLogos();
  }, []);

  const fetchAllLogos = async () => {
    setIsLoading(true);
    try {
      // Fetch all logos for the cover (limit to reasonable number for performance)
      const { data, error } = await supabase
        .from('user_logos')
        .select(`
          *,
          user_profiles (
            x_username
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50); // Limit to 50 for performance

      if (error) throw error;
      setAllLogos(data || []);
    } catch (error) {
      console.error('Error fetching logos for cover:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateLogoSvg = (colors: UserLogo['logo_colors'], size = 'small') => {
    const dimensions = size === 'small' ? 'width="184" height="62"' : 'width="369" height="124"';
    return `<svg ${dimensions} viewBox="0 0 738 248" fill="none" xmlns="http://www.w3.org/2000/svg">
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

  if (isLoading) {
    return (
      <div className="mt-6 sm:mt-8 lg:mt-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-600">Creating community cover...</span>
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
              Community Showcase
            </h2>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Discover the amazing creativity of our community! Each logo tells a unique story of artistic expression.
          </p>
          <div className="mt-3 sm:mt-4">
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-1 sm:py-2 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {allLogos.length} Creative{allLogos.length !== 1 ? 's' : ''} and Counting
              </span>
            </span>
          </div>
        </div>

        {/* Logo Collage */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute top-0 left-0 w-8 sm:w-16 h-full bg-gradient-to-r from-purple-50 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-8 sm:w-16 h-full bg-gradient-to-l from-blue-50 to-transparent z-10"></div>
          
          {/* Scrolling logos container */}
          <div className="flex gap-2 sm:gap-4 py-4 sm:py-6 animate-scroll">
            {/* First set of logos */}
            {allLogos.map((logo, index) => (
              <div
                key={`first-${logo.id}`}
                className="flex-shrink-0 bg-white rounded-lg shadow-sm p-2 sm:p-3 hover:shadow-md transition-shadow duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div 
                  className="w-16 h-5 sm:w-20 sm:h-6 lg:w-24 lg:h-8 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: generateLogoSvg(logo.logo_colors, 'small') }}
                />
                <div className="mt-1 sm:mt-2 text-center">
                  <span className="text-xs text-gray-500 truncate block max-w-16 sm:max-w-20 lg:max-w-24">
                    @{logo.user_profiles?.x_username || 'user'}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {allLogos.map((logo, index) => (
              <div
                key={`second-${logo.id}`}
                className="flex-shrink-0 bg-white rounded-lg shadow-sm p-2 sm:p-3 hover:shadow-md transition-shadow duration-300"
                style={{
                  animationDelay: `${(index + allLogos.length) * 0.1}s`
                }}
              >
                <div 
                  className="w-16 h-5 sm:w-20 sm:h-6 lg:w-24 lg:h-8 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: generateLogoSvg(logo.logo_colors, 'small') }}
                />
                <div className="mt-1 sm:mt-2 text-center">
                  <span className="text-xs text-gray-500 truncate block max-w-16 sm:max-w-20 lg:max-w-24">
                    @{logo.user_profiles?.x_username || 'user'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="p-4 sm:p-6 text-center bg-gradient-to-r from-purple-100 to-pink-100">
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            🎨 Join the creative community! Design your own INCO logo and see it featured here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityCover;