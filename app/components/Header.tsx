import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full mb-8 md:mb-12 md:mt-2 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="TRI-CITIES MPO Logo"
            width={198}
            height={148}
            className="w-auto h-16 md:h-20"
            priority
          />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
            TRI-CITIES MPO
          </h1>
          <p className="text-xs md:text-sm text-gray-500 tracking-widest uppercase mt-1">
            Metropolitan Planning Organisation
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
