import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { TbMapPin, TbPhoneCall } from 'react-icons/tb';

export default function NavHeader({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container md:hidden flex justify-between">
        <div className="flex items-center gap-x-1">
          <TbPhoneCall className="text-lg text-primary" />
          <p className="text-xs text-primary font-medium">09512385721</p>
        </div>
        <div className="flex items-center gap-x-1">
          <TbMapPin className="text-lg text-primary" />
          <p className="text-xs text-primary font-medium">
            Brgy. Bagong Tubig 4212 Calaca
          </p>
        </div>
      </div>
      <div className="container py-5 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/onc_logo.jpg"
            alt="ONC Logo"
            width={190}
            priority
            height={0}
          />
        </Link>
        <div className="flex gap-x-6">
          <div className="hidden md:block">
            <div className="flex gap-x-5 text-xs lg:text-sm uppercase">
              <div className="flex items-start">
                <TbPhoneCall className="text-2xl text-primary" />
                <div className=" leading-none">
                  <p className="font-bold text-primary">Contact</p>
                  <span className="text-black font-medium">(123) 456-7890</span>
                </div>
              </div>
              <div className="flex items-start">
                <TbMapPin className="text-2xl text-primary" />
                <div className="leading-none">
                  <address className="font-bold uppercase not-italic text-primary">
                    Address
                  </address>
                  <span className="text-black font-medium">
                    Brgy. Bagong Tubig 4212 Calaca
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-3">
              <FaFacebook className="text-2xl text-gray-400 hover:text-primary" />
              <FaYoutube className="text-2xl text-gray-400 hover:text-primary" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
