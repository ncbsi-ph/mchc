import Breadcrumbs from '@/app/components/breadcrumbs';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { Metadata } from 'next';

interface Terms {
  terms_and_conditions: string;
  terms_last_modified: string;
}

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'app/(general)/services/opd/page.tsx Terms and Conditions',
};

const getTerms = async (): Promise<Terms> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}terms-and-conditions`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function TermsConditions() {
  const pageTitle = 'Terms and Conditions';
  const terms = await getTerms();
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <p className="italic text-gray-500 text-sm">
          Last modified:{' '}
          <span>
            {dayjs(terms.terms_last_modified).format('MMMM DD, YYYY')}
          </span>
        </p>
        <div className="ck-content">{parse(terms.terms_and_conditions)}</div>
      </section>
    </>
  );
}
