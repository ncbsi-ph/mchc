'use client';
import { SectionTitle } from '@/app/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { listsTypes } from './services';

interface NavServicesItemTypes {
  label: string;
  link?: string;
}

const navServicesItems: NavServicesItemTypes[] = [
  {
    label: 'Pharmacy Services',
  },
  {
    label: 'Emergency Room',
  },
  {
    label: 'Laboratory Services',
    link: '/services/laboratory',
  },
  {
    label: 'Radiology and Diagnostic Procedures',
    link: '/services/radiology-diagnostic-procedures',
  },
  {
    label: 'Out-Patient Department',
    link: '/services/opd',
  },
];

interface ServiceItemsProps {
  data: listsTypes[];
}

export default function ServiceItems({ data }: ServiceItemsProps) {
  const router = useRouter();
  return (
    <div className="py-28">
      <div className="text-center pb-10 container">
        <SectionTitle
          heading="Our Services"
          subHeading="Your Trusted Healthcare"
        />
      </div>
      <div className="lg:container grid lg:grid-cols-3 gap-y-10 items-start">
        <div className="bg-white px-5 py-6">
          <ul className="text-primary">
            {navServicesItems.map((item, i) => (
              <li key={i} className="text-xl py-2 lg:text-lg">
                {item.link === undefined ? (
                  item.label
                ) : (
                  <Link
                    href={item.link}
                    className="flex justify-between items-center"
                  >
                    {item.label}
                    <HiOutlineArrowNarrowRight className="text-3xl flex-shrink-0" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 lg:col-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.map((list, i) => (
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push(`/services/others/#${list.hash_link}`, {
                  scroll: true,
                });
              }}
              key={i}
            >
              <div className="w-full h-28 relative md:h-20">
                <Image
                  src={list.icon}
                  alt={list.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'contain',
                  }}
                  quality={50}
                />
              </div>
              <p className="text-center text-lg md:text-base text-primary pt-3">
                {list.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
