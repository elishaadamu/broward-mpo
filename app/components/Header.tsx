import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full mb-8 md:mb-10 md:mt-4 py-5 border-b border-[#2a2f45] bg-[#0f1117]">
      <div className="flex items-center gap-5">
        <Link href="/" className="hover:opacity-90 transition-opacity duration-200 shrink-0">
          <Image
            src="/images/logo.png"
            alt="TRI-CITIES MPO Logo"
            width={198}
            height={148}
            className="w-auto h-14 md:h-16 object-contain"
            priority
          />
        </Link>
        <div className="flex flex-col">
          <Link href="/" className="no-underline group">
            <h1 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight leading-none group-hover:text-[#38bdf8] transition-colors duration-200">
              TRI-CITIES MPO
            </h1>
          </Link>
          <span className="text-[10px] md:text-xs text-slate-500 font-bold tracking-widest uppercase mt-1.5 leading-none">
            Metropolitan Planning Organisation
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
