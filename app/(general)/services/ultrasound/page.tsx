import Breadcrumbs from '@/app/components/breadcrumbs';
import UltrasoundClient from '@/app/components/services/ultrasound-client';

export interface UltrasoundDataTypes {
  id: number;
  name: string;
}

const ultrasoundData: UltrasoundDataTypes[] = [
  {
    id: 1,
    name: '24HR HOLTER MONITORING',
  },
  {
    id: 2,
    name: 'APPENDIX',
  },
  {
    id: 3,
    name: 'Chest /hemithorax',
  },
  {
    id: 4,
    name: 'Congenital Anomaly scan (CAS) OB New',
  },
  {
    id: 5,
    name: 'Gyne - TVS Doppler OB New',
  },
  {
    id: 6,
    name: 'Paracentesis',
  },
];

export default function Ultrasound() {
  const pageTitle = 'Ultrasound';
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
