import Breadcrumbs from '@/app/components/breadcrumbs';
import CareersClient from '@/app/components/careers/careers-client';

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
