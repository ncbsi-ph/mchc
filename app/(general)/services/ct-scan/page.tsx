import Breadcrumbs from '@/app/components/breadcrumbs';
import CTScanClient from '@/app/components/services/ct-scan-client';

export interface CTScanTypes {
  id: number;
  name: string;
}

const ctscanData: CTScanTypes[] = [
  {
    id: 1,
    name: '3D',
  },
  {
    id: 2,
    name: 'Abdomen Oral,Rectal & IV Contrast	',
  },
  {
    id: 3,
    name: 'Abdomen with IV and Oral',
  },
  {
    id: 4,
    name: 'Cranial IV Contrast',
  },
  {
    id: 5,
    name: 'Dynamic CT of Pancreas',
  },
  {
    id: 6,
    name: 'Extremities Plain',
  },
];

export default function CTScan() {
  const pageTitle = 'CT-Scan';
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <section className="container my-28">
        <CTScanClient data={ctscanData} />
      </section>
    </>
  );
}
