import { getAllPages } from '@/lib/markdown';
import { redirect } from 'next/navigation';

export default function Home() {
  const allPages = getAllPages();
  
  if (allPages.length > 0) {
    redirect(`/${allPages[0].slug}`);
  }

  return null;
}
