import ServiceItems from './service-items';
export interface listsTypes {
  id: number;
  name: string;
  icon: string;
  hash_link: string;
}

const getHomeService = async (): Promise<listsTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home/service`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};
export default async function Services() {
  const data = await getHomeService();
  return (
    <section className=" bg-altGray">
      <ServiceItems data={data} />
    </section>
  );
}
