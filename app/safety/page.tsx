import React from 'react';
import { getPageBySlug } from '@/lib/markdown';
import MarkdownContent from '../components/MarkdownContent';
import HeroBanner from '../components/HeroBanner';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Safety',
};

export default function SafetyPage() {
  const page = getPageBySlug('pm-1-safety');

  if (!page) {
    return notFound();
  }

  return (
    <div>
      <HeroBanner title="Safety" />
      <MarkdownContent content={page.content} />
    </div>
  );
}
