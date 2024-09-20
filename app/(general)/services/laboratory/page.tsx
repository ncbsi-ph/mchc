import Breadcrumbs from '@/app/components/breadcrumbs';
import LaboratoryClient from '@/app/components/services/laboratory-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laboratory Services ',
  description:
    'Explore the comprehensive laboratory services offered at Metro Calaca Hospital Corp. Our state-of-the-art facilities ensure accurate and timely diagnostics.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'Laboratory Services',
    'Medical Laboratory',
    'Diagnostic Services',
    'Healthcare',
  ],
  openGraph: {
    title: 'Laboratory Services | Metro Calaca Hospital Corp.',
    description:
      'Explore the comprehensive laboratory services offered at Metro Calaca Hospital Corp. Our state-of-the-art facilities ensure accurate and timely diagnostics.',
    url: 'https://mchc.comlogikph.com/services/laboratory',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laboratory Services | Metro Calaca Hospital Corp.',
    description:
      'Explore the comprehensive laboratory services offered at Metro Calaca Hospital Corp. Our state-of-the-art facilities ensure accurate and timely diagnostics.',
  },
};

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
