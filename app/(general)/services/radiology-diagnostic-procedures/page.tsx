import Breadcrumbs from '@/app/components/breadcrumbs';
import { RadiologyClient } from '@/app/components/services/radiology-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radiology & Diagnostic Procedure',
  description:
    'Discover the advanced radiology and diagnostic services offered by Metro Calaca Hospital Corp. We provide precise and comprehensive healthcare diagnostics.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'Radiology',
    'Diagnostic Procedure',
    'Medical Imaging',
    'Healthcare Diagnostics',
  ],
  openGraph: {
    title: 'Radiology & Diagnostic Procedure | Metro Calaca Hospital Corp.',
    description:
      'Discover the advanced radiology and diagnostic services offered by Metro Calaca Hospital Corp. We provide precise and comprehensive healthcare diagnostics.',
    url: 'https://mchc.comlogikph.com/services/radiology-diagnostic-procedures',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radiology & Diagnostic Procedure | Metro Calaca Hospital Corp.',
    description:
      'Discover the advanced radiology and diagnostic services offered by Metro Calaca Hospital Corp. We provide precise and comprehensive healthcare diagnostics.',
  },
};

export interface Radiology {
  id: 0;
  name: string;
  child: string | null;
}

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
