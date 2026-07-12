"use client";

import React, { useState } from 'react';
import MarkdownContent from '../components/MarkdownContent';

interface TransitPageTabsProps {
  transitAssetHtml: string;
  transitSafetyHtml: string;
}

export default function TransitPageTabs({ transitAssetHtml, transitSafetyHtml }: TransitPageTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('tam');

  return (
    <div className="space-y-6">
      {/* Transit Tabs */}
      <div className="flex gap-2 p-1 bg-[#1a1d2e] rounded-lg max-w-md border border-[#2a2f45]">
        <button
          onClick={() => setActiveTab('tam')}
          className={`flex-1 py-2 px-4 text-xs font-bold tracking-tight uppercase rounded-md transition-all ${
            activeTab === 'tam'
              ? 'bg-[#222640] text-[#38bdf8] shadow-sm'
              : 'text-slate-400 hover:text-[#38bdf8]'
          }`}
        >
          Transit Asset Management (TAM)
        </button>
        <button
          onClick={() => setActiveTab('ptasp')}
          className={`flex-1 py-2 px-4 text-xs font-bold tracking-tight uppercase rounded-md transition-all ${
            activeTab === 'ptasp'
              ? 'bg-[#222640] text-[#38bdf8] shadow-sm'
              : 'text-slate-400 hover:text-[#38bdf8]'
          }`}
        >
          Safety Plan (PTASP)
        </button>
      </div>

      <div className="mt-6 border-t border-[#2a2f45] pt-6">
        {activeTab === 'tam' ? (
          <MarkdownContent content={transitAssetHtml} />
        ) : (
          <MarkdownContent content={transitSafetyHtml} />
        )}
      </div>
    </div>
  );
}
