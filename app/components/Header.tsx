import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full mb-8 md:mb-12 md:mt-2 border-b-8 border-[#005a8b]">
      <Image
        src="/images/landing-image.webp"
        alt="Broward MPO Banner"
        width={1200}
        height={400}
        className="w-full h-auto"
        priority
      />
    </header>
  );
};



export default Header;
