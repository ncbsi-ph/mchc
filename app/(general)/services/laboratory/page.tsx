import Breadcrumbs from '@/app/components/breadcrumbs';
import LaboratoryClient from '@/app/components/services/laboratory-client';

export interface LaboratoryTypes {
  id: number;
  name: string;
}

const getLab = async (): Promise<LaboratoryTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}service/lab`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function Laboratory() {
  const pageTitle = 'Laboratory';
  const lab = await getLab();
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <section className="container my-28">
        <LaboratoryClient data={lab} />
      </section>
    </>
  );
}
