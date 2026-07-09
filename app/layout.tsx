import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getPageBySlug } from "@/lib/markdown";
import PersistentLayout from "./components/PersistentLayout";
import HeroBanner from "./components/HeroBanner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tri-Cities Area MPO Performance Measures",
    default: "Transportation Performance Measures | Tri-Cities Area MPO",
  },
  description: "Explore the Transportation Performance Management (TPM) dashboard for the Tri-Cities Area MPO. Monitor key transportation performance measures including Safety, Infrastructure Conditions, System Performance, and Transit.",
  keywords: [
    "Tri-Cities Area MPO",
    "TCAMPO",
    "Transportation Performance Measures",
    "TPM",
    "Safety performance measures",
    "Infrastructure conditions",
    "System performance",
    "Transit asset management",
    "PTASP",
    "Virginia transportation planning"
  ],
  authors: [{ name: "Tri-Cities Area Metropolitan Planning Organization" }],
  creator: "Tri-Cities Area MPO",
  publisher: "Tri-Cities Area MPO",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.tri-citiesmpo.org",
    title: "Transportation Performance Measures | Tri-Cities Area MPO",
    description: "Monitoring the performance of the Tri-Cities Area transportation system across Safety, Infrastructure, System Performance, and Transit.",
    siteName: "Tri-Cities Area MPO Performance Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transportation Performance Measures | Tri-Cities Area MPO",
    description: "Explore the Transportation Performance Management (TPM) dashboard for the Tri-Cities Area MPO.",
  }
};

// Pre-render transit view as a server component
function TransitView() {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const safety = getPageBySlug('pm-1-safety');
  const infrastructure = getPageBySlug('pm-2-infrastructure-conditions');
  const systemPerformance = getPageBySlug('pm-3-system-performance');

  return (
    <html lang="en">
      <head>
        {/* Preload Plotly so iframes render faster */}
        <link
          rel="preload"
          href="https://cdn.plot.ly/plotly-2.35.2.min.js"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased bg-white text-gray-900`}>
        <PersistentLayout
          safetyContent={safety?.content || ''}
          infrastructureContent={infrastructure?.content || ''}
          systemPerformanceContent={systemPerformance?.content || ''}
          transitElement={<TransitView />}
        >
          {children}
        </PersistentLayout>
      </body>
    </html>
  );
}
