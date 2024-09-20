import Navigation from '../components/nav';
import Footer from '../components/footer';

export interface Institutions {
  id: number;
  logo: string;
  logo_white: string;
  hero_background: string;
  contact_no: string;
  address: string;
  email_general_info: string;
  email_careers: string;
  email_hmo_approval: string;
  email_appointment: string;
}
const Institution = async (): Promise<Institutions> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}institution`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function GeneralLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const institution = await Institution();
  return (
    <section>
      <Navigation data={institution} />
      {children}
      <Footer data={institution} />
    </section>
  );
}
