import Image from 'next/image';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

interface ItemsType {
  title: JSX.Element | string;
}

interface BreadcrumbsProps {
  items: ItemsType[];
  title: string | React.ReactNode;
}

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

export default async function Breadcrumbs({ items, title }: BreadcrumbsProps) {
  const _items: ItemsType[] = [
    {
      title: (
        <Link href="/" className="text-secondary">
          Home
        </Link>
      ),
    },
  ];

  _items.push(...items);

  const institution = await Institution();
  return (
    <div className="relative w-full h-40 md:h-64">
      <Image
        src={institution.hero_background}
        alt="MCHC Background Image"
        fill
        quality={100}
        className="z-0 object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary/50 z-10">
        <div className="container w-full h-full grid content-center">
          <Breadcrumb separator=">" items={_items} />
          <h1 className="pt-1 text-2xl md:text-3xl text-secondary uppercase tracking-wider font-montserrat font-medium">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
