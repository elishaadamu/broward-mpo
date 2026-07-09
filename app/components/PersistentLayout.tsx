"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import OverviewTabs from './OverviewTabs';
import HeroBanner from './HeroBanner';
import MarkdownContent from './MarkdownContent';

interface PersistentLayoutProps {
  safetyContent: string;
  infrastructureContent: string;
  systemPerformanceContent: string;
  transitElement: React.ReactNode;
  children: React.ReactNode;
}

const TABS = ['overview', 'safety', 'infrastructure', 'system-performance', 'transit'] as const;
type Tab = typeof TABS[number];

function getTabFromPathname(path: string): Tab {
  if (path === '/safety') return 'safety';
  if (path === '/infrastructure') return 'infrastructure';
  if (path === '/system-performance') return 'system-performance';
  if (path === '/transit') return 'transit';
  return 'overview';
}

export default function PersistentLayout({
  safetyContent,
  infrastructureContent,
  systemPerformanceContent,
  transitElement,
}: PersistentLayoutProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>(() => getTabFromPathname(pathname));
  // Track which tabs have been visited so we only mount iframes on first visit
  const [visited, setVisited] = useState<Set<Tab>>(() => new Set([getTabFromPathname(pathname)]));

  // Sync with browser URL on initial load
  useEffect(() => {
    const tab = getTabFromPathname(pathname);
    setActiveTab(tab);
    setVisited(prev => new Set(prev).add(tab));
  }, [pathname]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPathname(window.location.pathname);
      setActiveTab(tab);
      setVisited(prev => new Set(prev).add(tab));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (slug: string) => {
    const tab = slug as Tab;
    setActiveTab(tab);
    setVisited(prev => new Set(prev).add(tab));
    const path = tab === 'overview' ? '/overview' : `/${tab}`;
    window.history.pushState(null, '', path);
  };

  // Memoize markdown renders so they don't re-parse on tab switches
  const safetyView = useMemo(() => (
    <>
      <HeroBanner title="Safety" />
      <MarkdownContent content={safetyContent} />
    </>
  ), [safetyContent]);

  const infrastructureView = useMemo(() => (
    <>
      <HeroBanner title="Infrastructure" />
      <MarkdownContent content={infrastructureContent} />
    </>
  ), [infrastructureContent]);

  const systemPerformanceView = useMemo(() => (
    <>
      <HeroBanner title="System Performance" />
      <MarkdownContent content={systemPerformanceContent} />
    </>
  ), [systemPerformanceContent]);

  // Use visibility-based toggling instead of display:none.
  // display:none causes browsers to unload iframe content;
  // visibility:hidden + height:0 keeps iframe content alive in memory.
  const panelStyle = (tab: Tab): React.CSSProperties => ({
    visibility: activeTab === tab ? 'visible' : 'hidden',
    height: activeTab === tab ? 'auto' : 0,
    overflow: activeTab === tab ? 'visible' : 'hidden',
    position: activeTab === tab ? 'relative' : 'absolute',
    width: '100%',
    // Keep inactive panels in the DOM flow but invisible
    ...(activeTab !== tab ? { pointerEvents: 'none' as const } : {}),
  });

  return (
    <div className="max-w-full md:max-w-7xl mx-auto px-4 pb-20">
      <Header />
      <div className="flex flex-col md:flex-row md:mx-20 gap-8">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        <main className="flex-1 min-w-0 relative">
          {/* Overview — always mounted */}
          <div style={panelStyle('overview')}>
            <OverviewTabs />
          </div>

          {/* Safety — mount on first visit, keep alive */}
          {visited.has('safety') && (
            <div style={panelStyle('safety')}>
              {safetyView}
            </div>
          )}

          {/* Infrastructure — mount on first visit, keep alive */}
          {visited.has('infrastructure') && (
            <div style={panelStyle('infrastructure')}>
              {infrastructureView}
            </div>
          )}

          {/* System Performance — mount on first visit, keep alive */}
          {visited.has('system-performance') && (
            <div style={panelStyle('system-performance')}>
              {systemPerformanceView}
            </div>
          )}

          {/* Transit — mount on first visit, keep alive */}
          {visited.has('transit') && (
            <div style={panelStyle('transit')}>
              {transitElement}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
