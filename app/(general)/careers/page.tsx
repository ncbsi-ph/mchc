import Breadcrumbs from '@/app/components/breadcrumbs';
import CareersClient from '@/app/components/careers/careers-client';

export interface CareersTypes {
  id: string;
  title: string;
  slug: string;
  slots: number;
  date_modified: string;
}

const careersData: CareersTypes[] = [
  {
    id: '1',
    title: 'test',
    slug: 'test',
    slots: 1,
    date_modified: 'October 10, 2024',
  },
];

export default function Careers() {
  const pageTitle = 'Careers';
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <CareersClient data={careersData} />
      </section>
    </>
  );
}
