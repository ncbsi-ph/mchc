import Breadcrumbs from '@/app/components/breadcrumbs';
import NewsEventsClient from '@/app/components/news-events/news-events-client';

export interface NewsEventsTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  type: 'news' | 'events' | 'promo';
  thumbnail: string;
}

const newsData: NewsEventsTypes[] = [
  {
    id: 1,
    title: 'NEW REHAB FACILITY OPENS',
    slug: 'new-rehab-facility-center',
    description:
      'We are delighted to announce that our Rehabilitation Center, in partnership with LIPA PHYSICAL REHABILITATION AND LEARNING CENTER, will be opening its doors on July 12, 2023.',
    date: '10/10/2024',
    type: 'news',
    thumbnail: 'string',
  },
  {
    id: 2,
    title: 'Test',
    slug: 'test',
    description:
      'Common Shares were then sold and Ground-Breaking Ceremony was held on March 2011. All necessary documents were filed, all permits to operate got into hands, and hiring personnel to render quality healthcare was done. After all the hardships of fulfilling a dream, it has now become true that the hospital was brought into reality. It is now open and ready to serve people at all times, in the name of Metro San Jose Medical Center.',
    date: '10/10/2024',
    type: 'events',
    thumbnail: 'string',
  },
  {
    id: 3,
    title: 'NEW REHAB FACILITY OPENS',
    slug: 'new-rehab-facility-center',
    description:
      'We are delighted to announce that our Rehabilitation Center, in partnership with LIPA PHYSICAL REHABILITATION AND LEARNING CENTER, will be opening its doors on July 12, 2023.',
    date: '10/10/2024',
    type: 'promo',
    thumbnail: 'string',
  },
];
export default function NewsEvents() {
  const pageTitle = 'News & Events';
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <NewsEventsClient data={newsData} />
      </section>
    </>
  );
}
