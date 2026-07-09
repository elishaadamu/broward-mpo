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
          className="md:hidden flex items-center gap-3 py-3 px-4 bg-[#1a1f2e] text-white font-bold text-sm tracking-wide"
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

      {/* Dark Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#1a1f2e] shadow-2xl transform transition-transform duration-300 ease-in-out
        md:sticky md:top-8 md:h-[calc(100vh-6rem)] md:translate-x-0 md:bg-[#1a1f2e] md:z-10 md:w-64 md:flex-shrink-0 md:shadow-xl
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
          <div className="px-6 py-6 border-b border-white/10">
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-1">Navigation</p>
            <p className="text-xs text-white/80">Performance Measures</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
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
                  className={`flex items-center gap-3 py-3 px-4 text-[13px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer group ${
                    isActive 
                      ? "bg-white/10 text-white border-l-[3px] border-l-[#0ea5e9]" 
                      : "text-white/70 border-l-[3px] border-l-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`text-[8px] transition-colors duration-200 ${isActive ? 'text-[#0ea5e9]' : 'text-white/30 group-hover:text-white/60'}`}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section: Social Icons */}
          <div className="px-6 py-5 border-t border-white/10">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase mb-3">Connect</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"><FaEnvelope size={14} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"><FaFacebookF size={14} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"><FaXTwitter size={14} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"><FaLinkedinIn size={14} /></a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
