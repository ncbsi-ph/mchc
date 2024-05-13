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

const news_events: NewsItemsTypes[] = [
  {
    id: 1,
    title: 'NEW REHAB FACILITY OPENS',
    slug: 'test',
    description:
      'We are delighted to announce that our Rehabilitation Center, in partnership with LIPA PHYSICAL REHABILITATION AND LEARNING CENTER, will be opening its doors on July 12, 2023.',
    date: '10/10/2024',
    type: 'promo',
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
    slug: 'test',
    description:
      'We are delighted to announce that our Rehabilitation Center, in partnership with LIPA PHYSICAL REHABILITATION AND LEARNING CENTER, will be opening its doors on July 12, 2023.',
    date: '10/10/2024',
    type: 'promo',
    thumbnail: 'string',
  },
];
const DATE_FORMAT = 'MMMM DD, YYYY';
export default function NewsEvents() {
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
                  className={`bg-slate-300 w-full h-60 relative ${
                    isOther ? 'md:h-72' : 'md:h-96'
                  }`}
                >
                  <Image
                    src="https://i.imgur.com/Ycfi8RS.png"
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
                  <p className="pt-2 underline text-primary group-hover:text-altPrimary md:text-sm">
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
                    <div className="bg-slate-300 relative flex-shrink-0 w-28 aspect-square sm:w-2/5 sm:h-[150px] md:w-44 lg:w-28 lg:h-full">
                      <Image
                        src="https://i.imgur.com/Ycfi8RS.png"
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top',
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
                      <p className="pt-2 underline text-primary group-hover:text-altPrimary md:text-sm">
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
              <CustomBtn type="primary">View all News & Events</CustomBtn>
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
