import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getAllPages } from "@/lib/markdown";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Broward MPO",
    default: "Transportation Performance Measures | Broward MPO",
  },
  description: "Monitoring and measuring the performance of Broward's transportation system.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = getAllPages();

  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased bg-white text-gray-900`}>
        <div className="max-w-full md:max-w-7xl mx-auto px-4 pb-20">
          <Header />
          <div className="flex flex-col md:flex-row md:mx-20 gap-8">
            <Sidebar pages={pages} />
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </body>

    </html>
  );
}
