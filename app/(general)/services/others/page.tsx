import Breadcrumbs from '@/app/components/breadcrumbs';
import { Metadata } from 'next';
import Image from 'next/image';
interface OtherServices {
  id: number;
  name: string;
  img: string;
  hash_link: string;
  description: string;
}

export const metadata: Metadata = {
  title: 'Other Services',
  description: 'Metro Calaca Hospital Corp Other Services',
};

const getOtherService = async (): Promise<OtherServices[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}service/others`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function Others() {
  const pageTitle = 'Others';
  const services = await getOtherService();
  const sortedData = services.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Services' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <section className="container my-28 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {sortedData.map((service, i) => (
          <div
            key={i}
            id={service.hash_link}
            className="bg-milk rounded-md overflow-hidden"
          >
            <div className="w-full h-52 md:h-44 bg-primary relative">
              <Image
                src={service.img}
                alt="mchc vision"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
                quality={40}
              />
            </div>
            <div className="py-5 px-4">
              <h2 className="text-lg md:text-base font-medium pb-2">
                {service.name}
              </h2>
              <p className="md:text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
