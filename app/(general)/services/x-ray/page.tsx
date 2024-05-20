import Breadcrumbs from '@/app/components/breadcrumbs';
import XRayClient from '@/app/components/services/xray-client';

export interface XRayDataTypes {
  id: number;
  name: string;
}

const getXray = async (): Promise<XRayDataTypes[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}service/radiology`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};
export default async function XRay() {
  const pageTitle = 'X-RAY';
  const xrayData = await getXray();
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
