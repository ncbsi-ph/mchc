import AboutNav from '@/app/components/about/aboutNav';
import Breadcrumbs from '@/app/components/breadcrumbs';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision & Mission ',
  description:
    'Explore the vision and mission of Metro Calaca Hospital Corp. Learn about our goals, values, and the driving principles behind our healthcare services.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'Vision & Mission',
    'Hospital Vision',
    'Healthcare Mission',
    'Hospital Goals',
    'Healthcare Values',
  ],
  openGraph: {
    title: 'Vision & Mission | Metro Calaca Hospital Corp.',
    description:
      'Explore the vision and mission of Metro Calaca Hospital Corp. Learn about our goals, values, and the driving principles behind our healthcare services.',
    url: 'https://mchc.comlogikph.com/about/vision-mission',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision & Mission | Metro Calaca Hospital Corp.',
    description:
      'Explore the vision and mission of Metro Calaca Hospital Corp. Learn about our goals, values, and the driving principles behind our healthcare services.',
  },
};

interface VisionMission {
  id: number;
  vision: string;
  mission: string;
  vision_img: string;
  mission_img: string;
}

const getVisionMission = async (): Promise<VisionMission> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}about/mission-vision`,
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
export default async function VisionMission() {
  const pageTitle = 'Vision & Mission';
  const data = await getVisionMission();

  return (
    <>
      <Breadcrumbs
        items={[{ title: 'About' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <AboutNav />
      <section className="container my-28 grid gap-y-10 md:grid-cols-2 gap-x-5">
        <div>
          <h2 className="uppercase text-primary font-semibold text-3xl text-center pb-3">
            Vision
          </h2>
          <div className="bg-milk w-full h-44 relative md:h-60">
            <Image
              src={data.vision_img}
              alt="mlmc vision"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
              }}
              quality={40}
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary/50 grid content-center">
              <p className="text-center text-white px-3 text-lg md:text-base md:px-10">
                {data.vision}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="uppercase text-primary font-semibold text-3xl text-center pb-3">
            Mission
          </h2>
          <div className="bg-milk w-full h-44 relative md:h-60">
            <Image
              src={data.mission_img}
              alt="mlmc mission"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
              }}
              quality={40}
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary/50 grid content-center">
              <p className="text-center text-white px-3 text-lg md:text-base md:px-10">
                {data.mission}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
