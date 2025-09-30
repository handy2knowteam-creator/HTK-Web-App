// Device detection and responsive utilities
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Check specific devices
  const isIPhone = /iPhone/i.test(userAgent);
  const isIPad = /iPad/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isDesktop = !isMobile;
  
  // Check screen size
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // Determine layout type
  const isSmallScreen = screenWidth < 768;
  const isMediumScreen = screenWidth >= 768 && screenWidth < 1024;
  const isLargeScreen = screenWidth >= 1024;
  
  // Check if touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return {
    isMobile,
    isIPhone,
    isIPad,
    isAndroid,
    isDesktop,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isTouchDevice,
    screenWidth,
    screenHeight,
    userAgent
  };
};

// Get responsive styles based on device
export const getResponsiveStyles = (device) => {
  const baseStyles = {
    // Mobile-first approach
    container: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: device.isSmallScreen ? '0 1rem' : '0 2rem'
    },
    
    // Typography
    heroTitle: {
      fontSize: device.isSmallScreen ? '2rem' : device.isMediumScreen ? '3rem' : '4rem',
      lineHeight: '1.2',
      fontWeight: 'bold'
    },
    
    subtitle: {
      fontSize: device.isSmallScreen ? '1rem' : device.isMediumScreen ? '1.125rem' : '1.25rem',
      lineHeight: '1.6'
    },
    
    // Buttons
    primaryButton: {
      padding: device.isSmallScreen ? '0.875rem 1.5rem' : '1rem 2rem',
      fontSize: device.isSmallScreen ? '1rem' : '1.125rem',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      width: device.isSmallScreen ? '100%' : 'auto',
      minWidth: device.isSmallScreen ? 'auto' : '300px'
    },
    
    // Grid layouts
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: device.isSmallScreen 
        ? 'repeat(2, 1fr)' 
        : device.isMediumScreen 
        ? 'repeat(2, 1fr)' 
        : 'repeat(4, 1fr)',
      gap: device.isSmallScreen ? '1rem' : '2rem'
    },
    
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: device.isSmallScreen 
        ? '1fr' 
        : device.isMediumScreen 
        ? 'repeat(2, 1fr)' 
        : 'repeat(4, 1fr)',
      gap: device.isSmallScreen ? '1.5rem' : '2rem'
    },
    
    // Spacing
    sectionPadding: {
      padding: device.isSmallScreen ? '3rem 1rem' : '5rem 1rem'
    },
    
    // Navigation
    nav: {
      display: device.isSmallScreen ? 'none' : 'flex',
      gap: '2rem'
    },
    
    mobileNav: {
      display: device.isSmallScreen ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '1rem'
    }
  };
  
  return baseStyles;
};

// Touch-friendly button styles
export const getTouchStyles = (device) => {
  if (!device.isTouchDevice) return {};
  
  return {
    minHeight: '44px', // iOS recommended touch target
    minWidth: '44px',
    padding: '12px 16px'
  };
};

// iPhone specific optimizations
export const getIPhoneOptimizations = (device) => {
  if (!device.isIPhone) return {};
  
  return {
    // Prevent zoom on input focus
    inputStyles: {
      fontSize: '16px' // Prevents zoom on iOS
    },
    
    // Safe area handling for iPhone X+
    safeArea: {
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)'
    },
    
    // Smooth scrolling
    scrollBehavior: {
      WebkitOverflowScrolling: 'touch'
    }
  };
};

// Performance optimizations for mobile
export const getMobileOptimizations = (device) => {
  if (!device.isMobile) return {};
  
  return {
    // Reduce animations on mobile for better performance
    reducedMotion: {
      transition: 'none',
      animation: 'none'
    },
    
    // Optimize images
    imageOptimization: {
      loading: 'lazy',
      decoding: 'async'
    },
    
    // Touch optimizations
    touchAction: 'manipulation' // Prevents double-tap zoom
  };
};
