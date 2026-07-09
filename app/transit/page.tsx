import React from 'react';
import { getPageBySlug } from '@/lib/markdown';
import TransitPageTabs from './TransitPageTabs';
import HeroBanner from '../components/HeroBanner';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Transit',
};

export default function TransitPage() {
  const transitAsset = getPageBySlug('transit-asset-management');
  const transitSafety = getPageBySlug('public-transportation-agency-safety-plan');

  if (!transitAsset || !transitSafety) {
    return notFound();
  }

  return (
    <div>
      <HeroBanner title="Transit" />
      <TransitPageTabs
        transitAssetHtml={transitAsset.content}
        transitSafetyHtml={transitSafety.content}
      />
    </div>
  );
}
