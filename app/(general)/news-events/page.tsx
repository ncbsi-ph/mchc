import Breadcrumbs from '@/app/components/breadcrumbs';
import NewsEventsClient from '@/app/components/news-events/news-events-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Events ',
  description:
    'Stay updated with the latest news and events at Metro Calaca Hospital Corp. Discover our recent activities, announcements, and more.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'News',
    'Events',
    'Hospital News',
    'Healthcare Events',
    'Announcements',
  ],
  openGraph: {
    title: 'News & Events | Metro Calaca Hospital Corp.',
    description:
      'Stay updated with the latest news and events at Metro Calaca Hospital Corp. Discover our recent activities, announcements, and more.',
    url: 'https://mchc.comlogikph.com/news-events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Events | Metro Calaca Hospital Corp.',
    description:
      'Stay updated with the latest news and events at Metro Calaca Hospital Corp. Discover our recent activities, announcements, and more.',
  },
};

export interface NewsEventsTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  type: string;
  thumbnail: string;
}

const getHomeNews = async (): Promise<NewsEventsTypes[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}home/news-events`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function NewsEvents() {
  const pageTitle = 'News & Events';
  const newsData = await getHomeNews();
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <NewsEventsClient data={newsData} />
      </section>
    </>
  );
}
