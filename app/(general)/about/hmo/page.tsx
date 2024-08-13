import Breadcrumbs from '@/app/components/breadcrumbs';
import HMOClient from '@/app/components/hmo/hmo-client';
import Link from 'next/link';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export interface HMOTypes {
  id: number;
  name: string;
  logo: string;
}

const getHmo = async (): Promise<HMOTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}about/hmo`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function AccreditedHMO() {
  const pageTitle = 'Accredited HMO';
  const data = await getHmo();
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'HMO' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <section className="container my-28 grid gap-y-10">
        <Link href="/hmo-approval">
          <div className="bg-primary w-full flex items-center justify-between text-white font-medium py-3 px-5">
            <h3 className="text-lg">Go to our HMO Online Approval</h3>
            <HiOutlineArrowNarrowRight className="flex-shrink-0 text-3xl" />
          </div>
        </Link>
        <HMOClient data={data} />
      </section>
    </>
  );
}
