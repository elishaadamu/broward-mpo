import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#005a8b]/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#005a8b] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-[#005a8b] font-bold animate-pulse uppercase tracking-widest text-xs">
        Loading Transportation Data...
      </p>
    </div>
  );
}
