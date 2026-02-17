import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getPageBySlug, getAllPages } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import rehypeRaw from 'rehype-raw';
import ChartRenderer from '../components/ChartRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  return {
    title: page?.title || slug,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="prose max-w-none">
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}: any) => <h1 {...props} />,
          h2: ({node, ...props}: any) => <h2 {...props} />,
          p: ({node, ...props}: any) => <p {...props} />,
          strong: ({node, ...props}: any) => <strong className="font-bold text-[#005a8b]" {...props} />,
          img: ({node, ...props}: any) => (
            <img 
              {...props} 
              className="w-full h-auto rounded-xl shadow-md my-8 border border-gray-100" 
            />
          ),
          a: ({node, ...props}: any) => (
            <a 
              {...props} 
              className="text-[#005a8b] font-semibold underline-offset-4 hover:underline transition-all"
              target={props.href?.startsWith('http') ? '_blank' : undefined}
            />
          ),
          chart: ({node, ...props}: any) => (
            <ChartRenderer measure={props.measure} />
          ),
        } as any}
      >
        {page.content}
      </ReactMarkdown>
    </div>
  );
}

export async function generateStaticParams() {
  const pages = getAllPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}
