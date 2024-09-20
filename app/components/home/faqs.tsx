import { SectionTitle } from '@/app/helpers';
import { FaqsCollapse } from './faqs-collapse';

export interface FaqsTypes {
  id: number;
  title: string;
  description: string;
}

const getFaqs = async (): Promise<FaqsTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}faqs`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function Faqs() {
  const data = await getFaqs();
  return (
    <div>
      <div className="w-full">
        <SectionTitle heading="Frequently asked questions" subHeading="Faqs" />
      </div>
      <FaqsCollapse data={data} />
    </div>
  );
}
