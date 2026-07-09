"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaEnvelope, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { slug: 'overview', title: 'Overview' },
  { slug: 'safety', title: 'Safety' },
  { slug: 'infrastructure', title: 'Infrastructure' },
  { slug: 'system-performance', title: 'System Performance' },
  { slug: 'transit', title: 'Transit' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Find active item
  const activeItem = navItems.find(item => `/${item.slug}` === pathname) || navItems[0];

  return (
    <>
      {/* Mobile Menu Button - Top Left of content */}
      {!isOpen && (
        <button 
          onClick={toggleMenu}
          className="md:hidden flex items-center gap-2 p-3 bg-gray-100 text-gray-700 font-bold text-sm tracking-tighter"
        >
          <HiMenu size={24} className="bg-gray-600 text-white p-1" />
          <span>{activeItem.title}</span>
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:bg-transparent md:z-10 md:w-72 md:flex-shrink-0 md:pr-8 md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Mobile Header (Close button as seen in image) */}
          <div className="flex md:hidden bg-gray-100 border-b border-gray-300">
             <button 
                onClick={toggleMenu} 
                className="p-3 bg-gray-500 text-white hover:bg-gray-600 transition-colors"
             >
               <HiX size={28} />
             </button>
          </div>


          <div className="md:sticky md:top-8 space-y-8 overflow-y-auto px-6 md:px-0 mt-6 md:mt-0">

            <nav className="flex flex-col border-t border-gray-200">
              {navItems.map((item) => {
                const isActive = pathname === `/${item.slug}` || (item.slug === 'overview' && pathname === '/');
                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    scroll={false}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 px-1 text-[13px] font-bold transition-all border-b border-gray-200 uppercase tracking-tight ${
                      isActive 
                        ? "text-[#005a8b] border-l-4 border-l-[#005a8b] pl-4 md:-ml-4 bg-gray-50/50" 
                        : "text-gray-800 hover:text-[#005a8b] hover:pl-2"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
            
            <div className="flex space-x-5 text-[#005a8b] text-xl px-1">
              <a href="#" className="hover:scale-110 transition-transform"><FaEnvelope /></a>
              <a href="#" className="hover:scale-110 transition-transform"><FaFacebookF /></a>
              <a href="#" className="hover:scale-110 transition-transform"><FaXTwitter /></a>
              <a href="#" className="hover:scale-110 transition-transform"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

