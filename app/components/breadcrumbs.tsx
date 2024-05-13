import { Breadcrumb } from 'antd';
import Link from 'next/link';

interface ItemsType {
  title: JSX.Element | string;
}

interface BreadcrumbsProps {
  items: ItemsType[];
  title: string | React.ReactNode;
}

export default function Breadcrumbs({ items, title }: BreadcrumbsProps) {
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
  return (
    <div className="bg-center bg-cover  bg-[url('/onc_building.jpg')] w-full h-40 md:h-64 relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary/50">
        <div className="container w-full h-full grid content-center">
          <Breadcrumb separator=">" items={_items} />
          <h1 className="pt-1 text-2xl md:text-3xl text-yellow uppercase tracking-wider font-montserrat font-medium">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
