import React from 'react';

const HTKLogo = ({ size = 'medium', variant = 'full', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xlarge: 'text-4xl'
  };

  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circular background */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#000000"
          stroke="#B9975B"
          strokeWidth="2"
        />
        
        {/* Hammer */}
        <g transform="translate(20, 25)">
          <rect x="8" y="20" width="3" height="25" fill="#B9975B" />
          <rect x="6" y="18" width="7" height="8" rx="1" fill="#B9975B" />
        </g>
        
        {/* Wrench */}
        <g transform="translate(65, 30) rotate(45)">
          <rect x="0" y="8" width="20" height="3" fill="#B9975B" />
          <circle cx="18" cy="9.5" r="4" fill="none" stroke="#B9975B" strokeWidth="2" />
          <rect x="0" y="6" width="4" height="7" fill="#B9975B" />
        </g>
        
        {/* Screwdriver */}
        <g transform="translate(35, 15) rotate(-15)">
          <rect x="0" y="9" width="25" height="2" fill="#B9975B" />
          <rect x="23" y="7" width="4" height="6" fill="#B9975B" />
        </g>
        
        {/* Level/Ruler */}
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="30" height="4" fill="#B9975B" />
          <rect x="5" y="1" width="1" height="2" fill="#000000" />
          <rect x="10" y="1" width="1" height="2" fill="#000000" />
          <rect x="15" y="1" width="1" height="2" fill="#000000" />
          <rect x="20" y="1" width="1" height="2" fill="#000000" />
          <rect x="25" y="1" width="1" height="2" fill="#000000" />
        </g>
        
        {/* HTK Text */}
        <text
          x="50"
          y="75"
          textAnchor="middle"
          className="fill-current text-[#B9975B] font-bold"
          style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
        >
          HTK
        </text>
      </svg>
    </div>
  );

  const LogoText = () => (
    <div className={`${textSizes[size]} font-bold text-[#B9975B] ${className}`}>
      HTK
    </div>
  );

  const LogoFull = () => (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col">
        <div className={`${textSizes[size]} font-bold text-[#B9975B] leading-none`}>
          HTK
        </div>
        <div className="text-xs text-[#B9975B] opacity-80 font-medium tracking-wider">
          HANDY TO KNOW
        </div>
      </div>
    </div>
  );

  const LogoFullVertical = () => (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <LogoIcon />
      <div className="text-center">
        <div className={`${textSizes[size]} font-bold text-[#B9975B] leading-none`}>
          HTK
        </div>
        <div className="text-xs text-[#B9975B] opacity-80 font-medium tracking-wider">
          HANDY TO KNOW
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'icon':
      return <LogoIcon />;
    case 'text':
      return <LogoText />;
    case 'full':
      return <LogoFull />;
    case 'vertical':
      return <LogoFullVertical />;
    default:
      return <LogoFull />;
  }
};

export default HTKLogo;
