import React from 'react';
import { getPageBySlug } from '@/lib/markdown';
import MarkdownContent from '../components/MarkdownContent';
import HeroBanner from '../components/HeroBanner';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'System Performance',
};

export default function SystemPerformancePage() {
  const page = getPageBySlug('pm-3-system-performance');

  if (!page) {
    return notFound();
  }

  return (
    <div>
      <HeroBanner title="System Performance" />
      <MarkdownContent content={page.content} />
    </div>
  );
}
