import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/components/breadcrumbs';
import NewsEventsPostClient from '@/app/components/news-events/news-event-post-client';
import { Metadata } from 'next';
import Link from 'next/link';

type Params = {
  params: {
    slug: [number, string];
  };
};

export interface NewsItemTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  type: 'news' | 'events' | 'promo';
  thumbnail: string;
}

const getSingleNewsEvents = async (
  id: number
): Promise<NewsItemTypes | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}news-event/${id}`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) return null;

  return res.json();
};

export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  let news_event = await getSingleNewsEvents(slug[0]);

  if (!news_event) {
    notFound(); // Redirect to the not-found page if the data is not found
  }

  return {
    title: news_event.title,
    description: news_event.description,
    openGraph: {
      title: news_event.title,
      description: news_event.description,
      type: 'article',
      publishedTime: news_event.date,
      url: `${process.env.NEXT_PUBLIC_API_URL}news-events/${slug[0]}/${news_event.slug}`,
      images: [
        {
          url: news_event.thumbnail,
        },
      ],
    },
    twitter: {
      title: news_event.title,
      description: news_event.description,
      images: [news_event.thumbnail],
    },
  };
}

export default async function NewsEvent({ params: { slug } }: Params) {
  const news_event = await getSingleNewsEvents(slug[0]);

  if (!news_event) {
    notFound(); // Redirect to the not-found page if the data is not found
  }

  const pageTitle = news_event.title;

  return (
    <>
      <Breadcrumbs
        items={[
          { title: <Link href="/news-events">News & Events</Link> },
          { title: pageTitle },
        ]}
        title={pageTitle}
      />
      <NewsEventsPostClient data={news_event} />
    </>
  );
}
