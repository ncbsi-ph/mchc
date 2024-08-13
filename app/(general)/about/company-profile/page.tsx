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
  description:
    'The Metro Calaca Hospital Corp Expansion Project is a 3-storey    building with 72 - bed capacity within a total land area of Three Thousand Two Hundred Sixty Two(3262) square meter of leased property   embraced by OCT No. p3551 located at Barangay Palanas, Lemery,    Batangas with the following facilities: Emergency Room, Laboratory, Private and Semi - Private Rooms, Pharmacy Nursery, Stockroom, Radiology, Clinic Rooms, Conference Room, Operating Room,  Administrative Office, Canteen and other service facilities/utilities.',
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
