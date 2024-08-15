import { CustomBtn, SectionTitle } from '@/app/helpers';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';

interface NewsItemsTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  type: 'news' | 'events' | 'promo';
  thumbnail: string;
}
const getHomeNewsEvents = async (): Promise<NewsItemsTypes[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}home/news-events`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

const DATE_FORMAT = 'MMMM DD, YYYY';
export default async function NewsEvents() {
  const news_events = await getHomeNewsEvents();
  const latest = news_events[0];

  let isOther = news_events.length > 1;

  const other = isOther ? news_events.slice(1).slice(-3) : [];

  return (
    <section className="container my-28">
      <div className="text-center pb-10">
        <SectionTitle
          subHeading="Better information better health"
          heading="News & Events"
        />
      </div>
      {news_events.length > 0 ? (
        <>
          <div className="grid gap-y-8 lg:grid-cols-3 lg:gap-x-5 items-start">
            <div
              className={`${isOther ? 'lg:col-span-2' : 'lg:col-span-3'} group`}
            >
              <Link href={`/news-events/${latest.id}/${latest.slug}`}>
                <div
                  className={`bg-slate-300 w-full h-60 relative rounded-sm ${
                    isOther ? 'md:h-72' : 'md:h-96'
                  }`}
                >
                  <Image
                    src={latest.thumbnail}
                    alt={latest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    quality={50}
                  />
                </div>
                <div className="pt-2 text-lg md:text-base">
                  <p className="text-gray-500">
                    <span className="text-accent capitalize">
                      {latest.type} | {dayjs(latest.date).format(DATE_FORMAT)}
                    </span>
                  </p>
                  <h4 className="text-2xl font-medium py-1 lg:text-3xl md:font-semibold capitalize">
                    {latest.title}
                  </h4>
                  <div className="line-clamp-3 hidden-img">
                    {parse(latest.description)}
                  </div>
                  <p className="pt-2 underline text-primary group-hover:text-secondary md:text-sm">
                    Read more
                  </p>
                </div>
              </Link>
            </div>
            <div className="grid gap-y-5">
              {other.map((item) => (
                <Link
                  href={`/news-events/${latest.id}/${latest.slug}`}
                  key={item.id}
                >
                  <div className="flex gap-x-3 justify-start group">
                    <div className="bg-slate-300 relative flex-shrink-0 w-28 aspect-square sm:w-2/5 sm:h-[150px] md:w-44 lg:w-28 lg:h-full rounded-sm">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: 'contain',
                        }}
                        quality={50}
                      />
                    </div>
                    <div className="grid content-between">
                      <p className="text-gray-500 text-sm lg:text-xs">
                        <span className="text-accent capitalize">
                          {item.type}
                        </span>
                        | {dayjs(item.date).format(DATE_FORMAT)}
                      </p>
                      <h4 className="font-medium text-base line-clamp-2 py-1 capitalize">
                        {item.title}
                      </h4>
                      <div className="text-sm font-light line-clamp-2 hidden-img">
                        {parse(item.description)}
                      </div>
                      <p className="pt-2 underline text-primary group-hover:text-secondary md:text-sm">
                        Read more
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-10 grid lg:justify-items-center">
            <Link href="/news-events">
              <CustomBtn type="primary" className="hover:!bg-secondary">
                View all News & Events
              </CustomBtn>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full h-60 bg-milk/50 grid place-content-center">
          <p className="uppercase text-gray-300 text-lg">No News & Events</p>
        </div>
      )}
    </section>
  );
}
