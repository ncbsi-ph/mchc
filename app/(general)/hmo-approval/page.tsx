import Breadcrumbs from '@/app/components/breadcrumbs';
import HMOApprovalForm from '@/app/components/hmo/hmo-approval-form';
import { Metadata } from 'next';

export interface HMOTypes {
  id: number;
  name: string;
  logo: string;
}

export const metadata: Metadata = {
  title: 'HMO Approval',
  description: 'Metro Calaca Hospital Corp HMO Approval',
};

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

export default async function HmoApproval() {
  const pageTitle = 'HMO Online Approval';
  const hmo = await getHmo();
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="my-28 grid gap-y-10 lg:grid-cols-2 lg:container">
        <div className="container">
          <h2 className="text-xl font-medium">
            Complete the form to process your HMO requests at least{' '}
            <span className="text-primary">2 days prior to your visit.</span>
          </h2>
          <div className="pt-3">
            <p>
              You must submit a valid ID and HMO card, Any discrepancies may
              cause a delay in approval. We may contact you for verification if
              needed.
            </p>
          </div>
        </div>

        <HMOApprovalForm hmo={hmo} />
      </section>
    </>
  );
}
