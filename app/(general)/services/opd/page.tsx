import Breadcrumbs from '@/app/components/breadcrumbs';
import { OPDClient } from '@/app/components/services/opd-client';
import { Metadata } from 'next';

export interface OPDTypes {
  id: 0;
  name: string;
  child: string | null;
}
export const metadata: Metadata = {
  title: 'OPD Services',
  description: 'Metro Calaca Hospital Corp Out-Patient Department Services',
};

const getOPD = async (): Promise<OPDTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}service/opd`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function OPD() {
  const pageTitle = 'Out-Patient Department';
  const opd = await getOPD();
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <OPDClient data={opd} />
    </>
  );
}
