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

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (slug: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const currentSlug = activeTab || pathname.replace('/', '') || 'overview';
  const activeItem = navItems.find(item => item.slug === currentSlug) || navItems[0];

  return (
    <>
      {/* Mobile Menu Button - Top Left of content */}
      {!isOpen && (
        <button 
          onClick={toggleMenu}
          className="md:hidden flex items-center gap-2 p-3 bg-slate-100 text-slate-700 font-bold text-sm tracking-tighter border border-slate-200"
        >
          <HiMenu size={20} className="bg-slate-700 text-white p-0.5" />
          <span>{activeItem.title}</span>
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:bg-transparent md:z-10 md:w-64 md:flex-shrink-0 md:pr-4 md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col justify-between">
          <div className="space-y-6 md:sticky md:top-8 mt-6 md:mt-0">
            {/* Mobile Header (Close button) */}
            <div className="flex md:hidden bg-slate-50 border-b border-slate-200 mb-4 justify-end">
               <button 
                  onClick={toggleMenu} 
                  className="p-3 bg-slate-600 text-white hover:bg-slate-700 transition-colors"
               >
                  <HiX size={24} />
               </button>
            </div>

            {/* Premium Sidebar Navigation */}
            <nav className="flex flex-col border border-slate-100 bg-white shadow-sm md:shadow-none">
              {navItems.map((item) => {
                const isActive = currentSlug === item.slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    scroll={false}
                    onClick={(e) => {
                      if (onTabChange) {
                        e.preventDefault();
                        onTabChange(item.slug);
                      }
                      setIsOpen(false);
                    }}
                    className={`py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider transition-all duration-150 border-l-2 cursor-pointer flex items-center justify-between ${
                      isActive 
                        ? "text-[#005a8b] border-[#005a8b] bg-slate-50/70" 
                        : "text-slate-600 border-transparent hover:text-[#005a8b] hover:bg-slate-50/30 hover:border-slate-200"
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className={`text-[10px] transition-transform duration-200 ${isActive ? 'translate-x-1 text-[#005a8b]' : 'opacity-0'}`}>
                      ➔
                    </span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Sleeker Social Icons container */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-100 px-4 text-slate-400">
              <a href="#" className="hover:text-[#005a8b] hover:scale-110 transition-all duration-150"><FaEnvelope size={16} /></a>
              <a href="#" className="hover:text-[#005a8b] hover:scale-110 transition-all duration-150"><FaFacebookF size={16} /></a>
              <a href="#" className="hover:text-[#005a8b] hover:scale-110 transition-all duration-150"><FaXTwitter size={16} /></a>
              <a href="#" className="hover:text-[#005a8b] hover:scale-110 transition-all duration-150"><FaLinkedinIn size={16} /></a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
