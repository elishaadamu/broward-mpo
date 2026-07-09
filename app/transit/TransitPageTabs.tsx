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
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg max-w-md">
        <button
          onClick={() => setActiveTab('tam')}
          className={`flex-1 py-2 px-4 text-xs font-bold tracking-tight uppercase rounded-md transition-all ${
            activeTab === 'tam'
              ? 'bg-white text-[#005a8b] shadow-sm'
              : 'text-gray-600 hover:text-[#005a8b]'
          }`}
        >
          Transit Asset Management (TAM)
        </button>
        <button
          onClick={() => setActiveTab('ptasp')}
          className={`flex-1 py-2 px-4 text-xs font-bold tracking-tight uppercase rounded-md transition-all ${
            activeTab === 'ptasp'
              ? 'bg-white text-[#005a8b] shadow-sm'
              : 'text-gray-600 hover:text-[#005a8b]'
          }`}
        >
          Safety Plan (PTASP)
        </button>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-6">
        {activeTab === 'tam' ? (
          <MarkdownContent content={transitAssetHtml} />
        ) : (
          <MarkdownContent content={transitSafetyHtml} />
        )}
      </div>
    </div>
  );
}
