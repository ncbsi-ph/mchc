import Breadcrumbs from '@/app/components/breadcrumbs';
import CareersClient from '@/app/components/careers/careers-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Explore career opportunities at Metro Calaca Hospital Corp. Join our team and contribute to delivering quality healthcare services.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'Careers',
    'Job Openings',
    'Healthcare Careers',
    'Medical Jobs',
  ],
  openGraph: {
    title: 'Careers | Metro Calaca Hospital Corp.',
    description:
      'Explore career opportunities at Metro Calaca Hospital Corp. Join our team and contribute to delivering quality healthcare services.',
    url: 'https://mchc.comlogikph.com/careers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | Metro Calaca Hospital Corp.',
    description:
      'Explore career opportunities at Metro Calaca Hospital Corp. Join our team and contribute to delivering quality healthcare services.',
  },
};

export interface CareersTypes {
  id: string;
  title: string;
  slug: string;
  slots: number;
  date_modified: string;
}

const getCareers = async (): Promise<CareersTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}careers`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');

  return res.json();
};

export default async function Careers() {
  const careersData = await getCareers();
  const pageTitle = 'Careers';
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <CareersClient data={careersData} />
      </section>
    </>
  );
}
