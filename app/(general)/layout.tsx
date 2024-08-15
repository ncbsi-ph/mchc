import Navigation from '../components/nav';
import Footer, { Institutions } from '../components/footer';

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
      <Footer />
    </section>
  );
}
