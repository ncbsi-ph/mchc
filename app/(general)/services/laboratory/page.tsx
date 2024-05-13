import Breadcrumbs from '@/app/components/breadcrumbs';
import LaboratoryClient from '@/app/components/services/laboratory-client';

export interface LabDataTypes {
  id: number;
  name: string;
}

const labData: LabDataTypes[] = [
  {
    id: 1,
    name: '2-HR PPBS (Post-prandial bld.sugar)',
  },
  {
    id: 2,
    name: '24 HR UR CREA',
  },
  {
    id: 3,
    name: '24 HR UR CREACLRANCE',
  },
  {
    id: 4,
    name: 'ACID PHOSPHATASE',
  },
  {
    id: 5,
    name: 'AFB TEST',
  },
  {
    id: 6,
    name: 'AMYLASE',
  },
];

export default function Laboratory() {
  const pageTitle = 'Laboratory';
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <section className="container my-28">
        <LaboratoryClient data={labData} />
      </section>
    </>
  );
}
