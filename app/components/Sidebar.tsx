"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaEnvelope, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { slug: 'overview', title: 'Overview', icon: '◆' },
  { slug: 'safety', title: 'Safety', icon: '◆' },
  { slug: 'infrastructure', title: 'Infrastructure', icon: '◆' },
  { slug: 'system-performance', title: 'System Performance', icon: '◆' },
  { slug: 'transit', title: 'Transit', icon: '◆' },
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
      {/* Mobile Menu Button */}
      {!isOpen && (
        <button 
          onClick={toggleMenu}
          className="md:hidden flex items-center gap-3 py-3 px-4 bg-[#152030] text-white font-bold text-sm tracking-wide rounded-xl border border-[#243044]"
        >
          <HiMenu size={20} />
          <span>{activeItem.title}</span>
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {/* Dark Sidebar — matching the deep navy card design */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#152030] shadow-2xl transform transition-transform duration-300 ease-in-out
        md:sticky md:top-8 md:h-[calc(100vh-6rem)] md:translate-x-0 md:z-10 md:w-64 md:flex-shrink-0 
        md:rounded-2xl md:border md:border-[#243044] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Mobile Close */}
          <div className="flex md:hidden justify-end border-b border-white/10">
            <button 
              onClick={toggleMenu} 
              className="p-3 text-slate-400 hover:text-white transition-colors"
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Sidebar Header */}
          <div className="px-6 pt-7 pb-5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-1">Navigation</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-2 px-4 space-y-2 overflow-y-auto">
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
                  className={`flex items-center gap-3 py-3.5 px-5 text-[13px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer group rounded-xl ${
                    isActive 
                      ? "bg-[#eab308] text-[#1a1400] shadow-lg shadow-yellow-500/20" 
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`text-[8px] transition-colors duration-200 ${isActive ? 'text-[#1a1400]/60' : 'text-white/30 group-hover:text-white/60'}`}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section: Social Icons */}
          <div className="px-6 py-5 border-t border-white/8">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-3">Connect</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/50 hover:text-[#eab308] transition-all duration-200 hover:scale-110"><FaEnvelope size={14} /></a>
              <a href="#" className="text-white/50 hover:text-[#eab308] transition-all duration-200 hover:scale-110"><FaFacebookF size={14} /></a>
              <a href="#" className="text-white/50 hover:text-[#eab308] transition-all duration-200 hover:scale-110"><FaXTwitter size={14} /></a>
              <a href="#" className="text-white/50 hover:text-[#eab308] transition-all duration-200 hover:scale-110"><FaLinkedinIn size={14} /></a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
