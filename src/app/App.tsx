import React, { useEffect, useRef, useState } from 'react';
import Profile from '../imports/Profile';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#fff3e0] overflow-x-hidden flex flex-col items-center">
      <ScaleWrapper width={1605} height={2122}>
        <Profile />
      </ScaleWrapper>
    </div>
  );
}

function ScaleWrapper({ children, width, height }: { children: React.ReactNode, width: number, height: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          // Calculate scale to fit width, with a max scale of 1.2 to avoid getting too huge on 4k screens
          // and some horizontal padding (e.g. 32px on each side = 64px)
          const padding = 64;
          const availableWidth = parent.clientWidth - padding;
          const newScale = Math.min(1.2, Math.max(0.1, availableWidth / width));
          setScale(newScale);
        }
      }
    };
    
    // Initial calculation
    handleResize();
    
    // Recalculate on window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center w-full relative pt-8 pb-16"
      style={{
        height: height * scale + 96, // Add some top and bottom padding buffer
      }}
    >
      <div 
        className="relative"
        style={{
          width: width,
          height: height,
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >
        {children}
      </div>
    </div>
  );
}