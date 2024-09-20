import AboutNav from '@/app/components/about/aboutNav';
import Breadcrumbs from '@/app/components/breadcrumbs';
import parse from 'html-react-parser';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'History ',
  description:
    'Discover the history of Metro Calaca Hospital Corp., from its founding to its growth and achievements over the years.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'History',
    'Hospital History',
    'Healthcare History',
    'Medical Facility',
  ],
  openGraph: {
    title: 'History | Metro Calaca Hospital Corp.',
    description:
      'Discover the history of Metro Calaca Hospital Corp., from its founding to its growth and achievements over the years.',
    url: 'https://mchc.comlogikph.com/about/history',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'History | Metro Calaca Hospital Corp.',
    description:
      'Discover the history of Metro Calaca Hospital Corp., from its founding to its growth and achievements over the years.',
  },
};

interface HistoryTypes {
  id: number;
  history: string;
}

const getHistory = async (): Promise<HistoryTypes> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}about/history`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function History() {
  const pageTitle = 'History';

  const data = await getHistory();

  return (
    <>
      <Breadcrumbs
        items={[{ title: 'About' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <AboutNav />
      <section className="ck-content container my-28 text-lg md:text-base text-justify">
        {parse(data.history)}
      </section>
    </>
  );
}
