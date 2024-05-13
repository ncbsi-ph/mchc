'use client';
import { SectionTitle } from '@/app/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

interface NavServicesItemTypes {
  label: string;
  link?: string;
}

const navServicesItems: NavServicesItemTypes[] = [
  {
    label: 'Laboratory Services',
    link: '/services/laboratory',
  },
  {
    label: 'Ultrasound',
    link: '/services/ultrasound',
  },
  {
    label: 'X-Ray',
    link: '/services/x-ray',
  },
  {
    label: 'CT-Scan',
    link: '/services/radiology-diagnostic-procedures',
  },
];

interface listsTypes {
  id: number;
  src: string;
  alt: string;
  title: string;
  hash_link: string;
}
const lists: listsTypes[] = [
  {
    id: 1,
    src: '/icons/service-icons/stone-cancer.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Stone Cancer',
    hash_link: '/',
  },
  {
    id: 2,
    src: '/icons/service-icons/pedeiatrics.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Pediatric Intensive Care Unit',
    hash_link: '/',
  },
  {
    id: 3,
    src: '/icons/service-icons/laparoscopy.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Laparoscopy Unit',
    hash_link: '/',
  },
  {
    id: 4,
    src: '/icons/service-icons/hemodialysis.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Hemodialysis',
    hash_link: '/',
  },
  {
    id: 5,
    src: '/icons/service-icons/cancer-center.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Cancer Center',
    hash_link: '/',
  },
  {
    id: 6,
    src: '/icons/service-icons/drug-testing.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Drug Testing Center',
    hash_link: '/',
  },
  {
    id: 7,
    src: '/icons/service-icons/icu.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Intensive & Critical Unit',
    hash_link: '/',
  },
  {
    id: 8,
    src: '/icons/service-icons/eye-center.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Eye Center',
    hash_link: '/',
  },
  {
    id: 9,
    src: '/icons/service-icons/endoscopy.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Endoscopy Unit',
    hash_link: '/',
  },
  {
    id: 10,
    src: '/icons/service-icons/neonatal.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Neonatal Intensive Unit',
    hash_link: '/',
  },
  {
    id: 11,
    src: '/icons/service-icons/ptor.svg',
    alt: 'METRO LEMERY MEDICAL CENTER IMAGE',
    title: 'Physical Therapy Orthopedic Rehabilitation Center',
    hash_link: '/',
  },
];

export default function ServiceItems() {
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
          {lists.map((list, i) => (
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
                  src={list.src}
                  alt={list.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'contain',
                  }}
                  quality={50}
                />
              </div>
              <p className="text-center text-lg md:text-base text-primary pt-3">
                {list.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
