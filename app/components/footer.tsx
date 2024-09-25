import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineMail } from 'react-icons/hi';
import { TbPhoneCall } from 'react-icons/tb';
import { Institutions } from '../(general)/layout';

interface FooterProps {
  data: Institutions;
}

export default function Footer({ data }: FooterProps) {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12 px-4 grid gap-10 md:grid-cols-3 lg:grid-cols-6">
        <div className="lg:col-span-2 flex flex-col gap-4 items-center md:items-start">
          <Link href="/">
            <Image
              src={data.logo_white}
              alt="Metro Calaca Hospital Logo"
              width={150}
              height={0}
            />
          </Link>
          <h3 className="text-lg italic font-semibold text-center md:text-left">
            &quot; Compassionate Healthcare&quot;
          </h3>
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 text-center md:text-left">
            <div className="text-lg">
              <div className="flex items-center justify-center md:justify-start gap-x-2">
                <TbPhoneCall className="text-xl" />
                <p className="font-medium">Telephone</p>
              </div>
              <p className="text-sm">{data.contact_no}</p>
            </div>
            <div className="text-lg">
              <div className="flex items-center justify-center md:justify-start gap-x-2">
                <HiOutlineMail className="text-xl" />
                <p className="font-medium">Email Address</p>
              </div>
              <a
                href={`mailto:${data.email_general_info}`}
                target="_blank"
                className="underline underline-offset-1 text-sm hover:text-secondary transition-colors"
              >
                {data.email_general_info}
              </a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="text-center md:text-left">
          <span className="text-lg font-medium">About</span>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link
                href="/about/history"
                className="hover:text-secondary transition-colors"
              >
                History
              </Link>
            </li>
            <li>
              <Link
                href="/about/vision-mission"
                className="hover:text-secondary transition-colors"
              >
                Vision & Mission
              </Link>
            </li>
            <li>
              <Link
                href="/about/company-profile"
                className="hover:text-secondary transition-colors"
              >
                Company Profile
              </Link>
            </li>
            <li>
              <Link
                href="/about/officers-board-directors"
                className="hover:text-secondary transition-colors"
              >
                Officers & Board Directors
              </Link>
            </li>
            <li>
              <Link
                href="/about/hmo"
                className="hover:text-secondary transition-colors"
              >
                HMO
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="text-center md:text-left">
          <span className="text-lg font-medium">Services</span>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link
                href="/services/laboratory"
                className="hover:text-secondary transition-colors"
              >
                Laboratory
              </Link>
            </li>
            <li>
              <Link
                href="/services/radiology-diagnostic-procedures"
                className="hover:text-secondary transition-colors"
              >
                Radiology & Diagnostic Procedures
              </Link>
            </li>
            <li>
              <Link
                href="/services/opd"
                className="hover:text-secondary transition-colors"
              >
                Out-Patient Department
              </Link>
            </li>
            <li>
              <Link
                href="/services/others"
                className="hover:text-secondary transition-colors"
              >
                Others
              </Link>
            </li>
          </ul>
          <span className="block mt-4 text-lg font-medium">Online Results</span>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link
                href="/portal/doctor"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                Doctor&apos;s Portal
              </Link>
            </li>
            <li>
              <Link
                href="/portal/patient"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                Patient&apos;s Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Additional Links Section */}
        <div className="text-center md:text-left">
          <ul className="space-y-4 text-lg">
            <li>
              <Link
                href="/doctors"
                className="hover:text-secondary transition-colors"
              >
                Doctors
              </Link>
            </li>
            <li>
              <Link
                href="/news-events"
                className="hover:text-secondary transition-colors"
              >
                News & Events
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-secondary transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative h-[260px] w-[130px] m-auto">
          <Image
            src="/corseal.png"
            alt="Metro Calaca Hospital Logo"
            fill
            className="object-contain lg:object-cover"
          />
        </div>
      </div>

      <div className="bg-secondary text-white font-medium py-2 px-5 text-xs text-center uppercase">
        &copy; {year} Metro Calaca Hospital Corp. ALL RIGHTS RESERVED |{' '}
        <Link
          href="/terms-and-conditions"
          className="underline underline-offset-2 hover:text-primary transition-colors"
        >
          Terms and Conditions
        </Link>{' '}
        |{' '}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-2 hover:text-primary transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
