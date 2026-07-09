import React from 'react';

interface HeroBannerProps {
  title: string;
}

export default function HeroBanner({ title }: HeroBannerProps) {
  return (
    <div 
      className="w-full h-32 md:h-40 rounded-none overflow-hidden mb-8 relative flex items-center px-8 shadow-sm border border-slate-200/60 bg-cover"
      style={{ 
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundPosition: "right center"
      }}
    >
      {/* Premium dark gradient overlay for text readability and visual depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
          {title}
        </h2>
      </div>
    </div>
  );
}
