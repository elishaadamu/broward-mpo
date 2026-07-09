import React from 'react';
import { getPageBySlug } from '@/lib/markdown';
import MarkdownContent from '../components/MarkdownContent';
import HeroBanner from '../components/HeroBanner';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Infrastructure',
};

export default function InfrastructurePage() {
  const page = getPageBySlug('pm-2-infrastructure-conditions');

  if (!page) {
    return notFound();
  }

  return (
    <div>
      <HeroBanner title="Infrastructure" />
      <MarkdownContent content={page.content} />
    </div>
  );
}
