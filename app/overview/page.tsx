import React from 'react';
import OverviewTabs from '../components/OverviewTabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overview',
};

export default function OverviewPage() {
  return (
    <div>
      <OverviewTabs />
    </div>
  );
}
