import AboutNav from '@/app/components/about/aboutNav';
import Breadcrumbs from '@/app/components/breadcrumbs';
import parse from 'html-react-parser';
import { Metadata } from 'next';

interface HistoryTypes {
  id: number;
  history: string;
}

export const metadata: Metadata = {
  title: 'History',
  description:
    'Metro Lemery Medical Center is a level 2 hospital situated at Palanas, Lemery Batangas. It was established on the May 25, 2005 and is owned by Saint Thomas Aquinas Hospital Corporation.',
};

const getHistory = async (): Promise<HistoryTypes> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}about/history`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
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
