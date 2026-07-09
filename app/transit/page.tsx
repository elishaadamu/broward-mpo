import React from 'react';
import HeroBanner from '../components/HeroBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transit',
};

export default function TransitPage() {
  return (
    <div>
      <HeroBanner title="Transit" />
      
      <div className="prose max-w-none text-gray-700 mb-8">
        <h1>Plots</h1>
      </div>

      <div className="prose max-w-none text-gray-700 mt-8">
        <h2>By supporting regional transit performance targets, TCAMPO commits to:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Coordinating with local transit providers to integrate TAM and safety targets into the regional planning process.</li>
          <li>Integrating specific transit performance measures and targets within the Long-Range Transportation Plan (LRTP).</li>
          <li>Demonstrating in the Metropolitan Transportation Improvement Program (MTIP) how planned investments support and advance these transit targets.</li>
        </ul>
      </div>
    </div>
  );
}
