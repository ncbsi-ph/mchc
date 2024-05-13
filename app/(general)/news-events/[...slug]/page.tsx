import Breadcrumbs from '@/app/components/breadcrumbs';
import { NewsEventsTypes } from '../page';
import Link from 'next/link';
import NewsEventsPostClient from '@/app/components/news-events/news-event-post-client';

type Params = {
  params: {
    slug: [number, string];
  };
};
const post: NewsEventsTypes = {
  id: 1,
  title: 'NEW REHAB FACILITY OPENS',
  slug: 'new-rehab-facility-center',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam sit commodi eum quas fugit, sapiente corporis! Aut fuga possimus necessitatibus reprehenderit dolores officiis dolore ipsa! Exercitationem voluptate maiores inventore consequuntur.',
  date: '10/10/2024',
  type: 'news',
  thumbnail: 'string',
};
export default function NewsEventsPost({ params: { slug } }: Params) {
  // const news_event = await getSingleNewsEvents(slug[0]);
  const pageTitle = 'NEW REHAB FACILITY OPENS';
  return (
    <>
      <Breadcrumbs
        items={[
          { title: <Link href="/news-events">News & Events</Link> },
          { title: pageTitle },
        ]}
        title={pageTitle}
      />
      <section className="container my-28">
        <NewsEventsPostClient data={post} />
      </section>
    </>
  );
}
