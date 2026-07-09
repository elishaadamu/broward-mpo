import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased bg-white text-gray-900`}>
        <div className="max-w-full md:max-w-7xl mx-auto px-4 pb-20">
          <Header />
          <div className="flex flex-col md:flex-row md:mx-20 gap-8">
            <Sidebar />
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </body>

    </html>
  );
}
