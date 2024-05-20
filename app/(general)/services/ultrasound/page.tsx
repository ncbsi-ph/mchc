import Breadcrumbs from '@/app/components/breadcrumbs';
import UltrasoundClient from '@/app/components/services/ultrasound-client';

export interface UltrasoundDataTypes {
  id: number;
  name: string;
}
const getUltrasound = async (): Promise<UltrasoundDataTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}service/opd`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function Ultrasound() {
  const pageTitle = 'Ultrasound';
  const ultrasoundData = await getUltrasound();
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <section className="container my-28">
        <UltrasoundClient data={ultrasoundData} />
      </section>
    </>
  );
}
