import Breadcrumbs from '@/app/components/breadcrumbs';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { Metadata } from 'next';

interface Privacy {
  privacy_policy: string;
  privacy_last_modified: string;
}

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Metro Calaca Hospital Corp Privacy Policy',
};

const getPrivacy = async (): Promise<Privacy> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}privacy-policy`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function PrivacyPolicy() {
  const pageTitle = 'Privacy Policy';
  const privacy = await getPrivacy();
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <p className="italic text-gray-500 text-sm">
          Last modified:{' '}
          <span>
            {dayjs(privacy.privacy_last_modified).format('MMMM DD, YYYY')}
          </span>
        </p>
        <div className="ck-content">{parse(privacy.privacy_policy)}</div>
      </section>
    </>
  );
}
