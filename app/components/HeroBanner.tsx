import React from 'react';

interface HeroBannerProps {
  title: string;
}

export default function HeroBanner({ title }: HeroBannerProps) {
  return (
    <div 
      className="w-full h-32 md:h-40 rounded-none overflow-hidden mb-8 relative flex items-center px-8 shadow-md border border-gray-100 bg-cover"
      style={{ 
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundPosition: "right center"
      }}
    >
      {/* Semi-transparent dark overlay to make text highly readable */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
          {title}
        </h2>
      </div>
    </div>
  );
}
