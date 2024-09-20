import { SectionTitle } from '@/app/helpers';
import parse from 'html-react-parser';

interface HomeAbout {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  yt_link: string;
}
const getHomeAbout = async (): Promise<HomeAbout> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home/about`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};
export default async function About() {
  const about = await getHomeAbout();
  return (
    <section className="my-28 text-center">
      <div className="container">
        <SectionTitle heading={about.title} subHeading={about.sub_title} />
        <div className="py-5 text-lg ck-content">
          {parse(about.description)}
        </div>
      </div>
      <iframe
        src={`${about.yt_link}?autoplay=1&mute=1&loop=1&controls=0`}
        title="METRO CALACA HOSPITAL CORP."
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full h-[256px] md:w-[711px] md:h-[400px] md:m-auto rounded-md"
      />
    </section>
  );
}
