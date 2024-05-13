import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineMail } from 'react-icons/hi';
import { TbPhoneCall } from 'react-icons/tb';

export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container py-16 grid gap-5 items-start md:grid-cols-2 lg:grid-cols-5">
        <div className="grid gap-y-10 lg:col-span-2">
          <Link href="/">
            <Image
              src="/onc_logo.jpg"
              alt="Metro Calaca Hospital Logo"
              width={190}
              height={0}
            />
          </Link>
          <h3 className="text-lg lg:text-base italic font-semibold">
            &quot; Compassionate Healthcare&quot;
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="text-lg lg:text-base">
              <div className="flex items-center gap-x-1">
                <TbPhoneCall className="text-2xl lg:text-xl" />
                <p className="font-medium ">Telephone</p>
              </div>
              <p className="lg:text-sm">(043) 123-3123 </p>
              <p className="lg:text-sm">(043) 123-3123</p>
            </div>
            <div className="text-lg lg:text-base">
              <div className="flex items-center gap-x-1">
                <HiOutlineMail className="text-2xl lg:text-xl" />
                <p className="font-medium ">Email Address</p>
              </div>
              <a
                href={`mailto:oncsampleemail@gmail.com`}
                target="_blank"
                className="underline underline-offset-1 lg:text-sm"
              >
                {/* {data.email_general_info} */}oncsampleemail@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div>
          <ul className="grid gap-y-5">
            <li>
              <span className="text-lg font-medium lg:text-base">About</span>
              <ul className="md:text-sm">
                <li>
                  <Link href="/about/history">History</Link>
                </li>
                <li>
                  <Link href="/about/vision-mission">Vision & Mission</Link>
                </li>
                <li>
                  <Link href="/about/company-profile">Company Profile</Link>
                </li>
                <li>
                  <Link href="/about/officers-board-directors">
                    Officers & Board Directors
                  </Link>
                </li>
                <li>
                  <Link href="/about/hmo">HMO</Link>
                </li>
              </ul>
            </li>
            <li className="text-lg font-medium lg:text-base">
              <Link href="/hmo-approval">HMO Approval</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="grid gap-y-5">
            <li>
              <span className="text-lg font-medium lg:text-base">Services</span>
              <ul className="md:text-sm">
                <li>
                  <Link href="/services/laboratory">Laboratory</Link>
                </li>
                <li>
                  <Link href="/services/radiology-diagnostic-procedures">
                    Radiology & Diagnostic Procedures
                  </Link>
                </li>
                <li>
                  <Link href="/services/opd">Out-Patient Department</Link>
                </li>
                <li>
                  <Link href="/services/others">Others</Link>
                </li>
              </ul>
            </li>
            <li>
              <span className="text-lg font-medium lg:text-base">
                Online Results
              </span>
              <ul className="md:text-sm">
                <li>
                  <Link href="/portal/doctor" target="_blank">
                    Doctor&apos;s Portal
                  </Link>
                </li>
                <li>
                  <Link href="/portal/patient" target="_blank">
                    Patient&apos;s Portal
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <ul className="grid gap-y-5">
            <li className="text-lg font-medium lg:text-base">
              <Link href="/doctors">Doctors</Link>
            </li>
            <li className="text-lg font-medium lg:text-base">
              <Link href="/news-events">News & Events</Link>
            </li>
            <li className="text-lg font-medium lg:text-base">
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-secondary text-white font-medium py-2 px-5 text-xs text-center uppercase">
        &copy; {year} Metro Calaca Hospital Corp. ALL RIGHTS RESERVED |{' '}
        <Link
          href="/terms-and-conditions"
          className="underline underline-offset-2"
        >
          Terms and Conditions
        </Link>{' '}
        |{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </Link>{' '}
      </div>
    </footer>
  );
}
