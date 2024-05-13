import Breadcrumbs from '@/app/components/breadcrumbs';
import XRayClient from '@/app/components/services/xray-client';

export interface XRayDataTypes {
  id: number;
  name: string;
}

const xrayData: XRayDataTypes[] = [
  {
    id: 1,
    name: 'Abdomen APL',
  },
  {
    id: 2,
    name: 'Abdomen Upright	',
  },
  {
    id: 3,
    name: 'Barium Edema',
  },
  {
    id: 4,
    name: 'Chest APL Adult',
  },
  {
    id: 5,
    name: 'Facial Bone (Skull AP / Waters / Bi.Lateral)',
  },
  {
    id: 6,
    name: '	Lumbo-sacral APL/O',
  },
];
export default function XRay() {
  const pageTitle = 'X-RAY';
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <section className="container my-28">
        <XRayClient data={xrayData} />
      </section>
    </>
  );
}
