'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AboutNavTypes {
  label: string;
  link: string;
}

const aboutNavItems: AboutNavTypes[] = [
  {
    label: 'History',
    link: '/about/history',
  },
  {
    label: 'Vision & Mission',
    link: '/about/vision-mission',
  },
  {
    label: 'Company Profile',
    link: '/about/company-profile',
  },
  {
    label: 'Officers & Board Directors',
    link: '/about/officers-board-directors',
  },
  {
    label: 'HMO',
    link: '/about/hmo',
  },
];

export default function AboutNav() {
  let pathname = usePathname() || '/';
  return (
    <nav className="bg-milk hidden md:block">
      <ul className="container py-5 flex justify-center gap-x-5">
        {aboutNavItems.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className={` py-1.5 px-4 text-sm rounded-sm ${
              pathname === item.link
                ? 'text-white bg-secondary font-semibold'
                : 'bg-primary text-white'
            }`}
          >
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
