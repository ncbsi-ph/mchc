import Breadcrumbs from '@/app/components/breadcrumbs';
import { OPDClient } from '@/app/components/services/opd-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Out-Patient Department ',
  description:
    'Discover the comprehensive services offered by the Out-Patient Department (OPD) at Metro Calaca Hospital Corp. We provide quality care and consultations for various medical needs.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'Out-Patient Department',
    'OPD Services',
    'Medical Consultations',
    'Healthcare',
  ],
  openGraph: {
    title: 'Out-Patient Department | Metro Calaca Hospital Corp.',
    description:
      'Discover the comprehensive services offered by the Out-Patient Department (OPD) at Metro Calaca Hospital Corp. We provide quality care and consultations for various medical needs.',
    url: 'https://mchc.comlogikph.com/services/opd',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Out-Patient Department | Metro Calaca Hospital Corp.',
    description:
      'Discover the comprehensive services offered by the Out-Patient Department (OPD) at Metro Calaca Hospital Corp. We provide quality care and consultations for various medical needs.',
  },
};

export interface OPDTypes {
  id: 0;
  name: string;
  child: string | null;
}

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
