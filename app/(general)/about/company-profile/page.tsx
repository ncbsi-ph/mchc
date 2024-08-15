import AboutNav from '@/app/components/about/aboutNav';
import Breadcrumbs from '@/app/components/breadcrumbs';
import parse from 'html-react-parser';
import { Metadata } from 'next';

interface CompanyProfileTypes {
  id: number;
  establishment: string;
  personnel: string;
}

export const metadata: Metadata = {
  title: 'Company Profile',
  description: '/',
};

const getCompanyProfile = async (): Promise<CompanyProfileTypes> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}about/company-profile`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function CompanyProfile() {
  const pageTitle = 'Company Profile';
  const data = await getCompanyProfile();
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'About' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <AboutNav />

      <section className="container my-28 grid gap-y-10">
        <div>
          <h2 className="text-2xl font-medium pb-1 md:text-xl">Establisment</h2>
          <div className="ck-content text-lg md:text-base">
            {parse(data.establishment)}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-medium pb-1 md:text-xl">Personnel</h2>
          <div className="ck-content text-lg md:text-base">
            {parse(data.personnel)}
          </div>
        </div>
      </section>
    </>
  );
}
