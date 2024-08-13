import Breadcrumbs from '@/app/components/breadcrumbs';
import { RadiologyClient } from '@/app/components/services/radiology-client';
import { Metadata } from 'next';

export interface Radiology {
  id: 0;
  name: string;
  child: string | null;
}

export const metadata: Metadata = {
  title: 'Radiology Diagnostic Procedures Services',
  description:
    'Metro Calaca Hospital Corp Radiology Diagnostic Procedures Services',
};

const getRadiology = async (): Promise<Radiology[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}service/radiology`,
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

export default async function RadiologyDiagnostic() {
  const pageTitle = 'Radiology and Diagnostic Procedure';
  const radiology = await getRadiology();

  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <RadiologyClient data={radiology} />
    </>
  );
}
