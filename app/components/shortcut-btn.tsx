import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

interface ShortCutBtnTypes {
  icon: string;
  title: string;
  link: string;
}

const quickLinkBtnItems: ShortCutBtnTypes[] = [
  {
    icon: '/custom-icon/doctor-portal.svg',
    title: 'Doctor Portal',
    link: '/portal/doctor',
  },
  {
    icon: '/custom-icon/patient-portal1.svg',
    title: 'Patient Portal',
    link: '/portal/patient',
  },
  {
    icon: '/custom-icon/online-results.svg',
    title: 'HMO Approval',
    link: '/hmo-approval',
  },
];
export default function ShortcutBtn() {
  return (
    <section className="grid divide-y divide-slate-200 md:container md:grid-cols-3 md:divide-none md:gap-x-5 md:-translate-y-2/4">
      {quickLinkBtnItems.map((item, i) => (
        <Link
          key={i}
          target="_blank"
          href={item.link}
          className="px-5 py-4 md:py-3 flex justify-between items-center bg-primary text-white md:rounded-md cursor-pointer hover:bg-secondary"
        >
          <p className="text-xl font-medium md:text-base">{item.title}</p>
          <div className="h-16 aspect-square hidden md:block relative">
            <Image
              src={item.icon}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'contain',
              }}
              quality={50}
              className="fill-white"
            />
          </div>
          <HiOutlineArrowNarrowRight className="text-2xl md:hidden" />
        </Link>
      ))}
    </section>
  );
}
