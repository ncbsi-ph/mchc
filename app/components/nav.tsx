'use client';
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import NavHeader from './nav-header';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Drawer, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { MdOpenInNew } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

export default function Navigation() {
  let pathname = usePathname() || '/';
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const items: MenuProps['items'] = [
    {
      label: <Link href="/">Home</Link>,
      key: '/',
    },
    {
      label: (
        <p className="flex items-center gap-x-1 md:hover:text-white transition ease-in-out delay-50">
          About
          <BiChevronDown className="text-lg hidden md:block" />
        </p>
      ),
      key: 'sub1',
      theme: 'light',
      children: [
        {
          label: <Link href="/about/history">History</Link>,
          key: '/about/history',
        },
        {
          label: <Link href="/about/vision-mission">Vision & Mission</Link>,
          key: '/about/vision-mission',
        },
        {
          label: <Link href="/about/company-profile">Company Profile</Link>,
          key: '/about/company-profile',
        },
        {
          label: (
            <Link href="/about/officers-board-directors">
              Officers & Board Directors
            </Link>
          ),
          key: '/about/officers-board-directors',
        },
        {
          label: <Link href="/about/hmo">HMO</Link>,
          key: '/about/hmo',
        },
      ],
    },
    {
      label: (
        <p className="flex items-center gap-x-1 md:hover:text-white transition ease-in-out delay-50">
          Services
          <BiChevronDown className="text-lg hidden md:block" />
        </p>
      ),
      key: 'sub2',
      theme: 'light',
      children: [
        {
          label: <Link href="/services/laboratory">Laboratory</Link>,
          key: '/services/laboratory',
        },
        {
          label: (
            <Link href="/services/radiology-diagnostic-procedures">
              Radiology & Diagnostic Procedures
            </Link>
          ),
          key: '/services/radiology-diagnostic-procedures',
        },
        {
          label: <Link href="/services/opd">Out-Patient Department</Link>,
          key: '/services/opd',
        },
        {
          label: <Link href="/services/others">Others</Link>,
          key: '/services/others',
        },
      ],
    },
    {
      label: <Link href="/doctors">Doctors</Link>,
      key: '/doctors',
    },
    {
      label: <Link href="/appointment">Appointment</Link>,
      key: '/appointment',
    },
    {
      label: (
        <p className="flex items-center gap-x-1 md:hover:text-white transition ease-in-out delay-50">
          Online Results <BiChevronDown className="text-lg hidden md:block" />
        </p>
      ),
      key: 'sub3',
      theme: 'light',
      children: [
        {
          label: (
            <Link href="/portal/doctor" target="_blank">
              Doctor's Portal
            </Link>
          ),
          key: '/portal/doctor',
          icon: <MdOpenInNew />,
        },
        {
          label: (
            <Link href="/portal/patient" target="_blank">
              Patient's Portal
            </Link>
          ),
          key: '/portal/patient',
          icon: <MdOpenInNew />,
        },
      ],
    },

    {
      label: <Link href="/news-events">News & Events</Link>,
      key: '/news-events',
    },
    {
      label: <Link href="/careers">Careers</Link>,
      key: '/careers',
    },
    {
      label: (
        <p
          onClick={() => {
            router.push('/#contact', { scroll: true });
          }}
        >
          Contact
        </p>
      ),
      key: '#contact',
    },
  ];

  const showDrawer = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <section>
      <section>
        <NavHeader>
          <nav className="text-3xl text-altBlack md:hidden">
            <BiMenu
              onClick={showDrawer}
              className="cursor-pointer hover:text-primary"
            />
            <Drawer
              placement="right"
              onClose={onClose}
              open={isOpen}
              destroyOnClose={true}
              styles={{
                header: {
                  display: 'grid',
                  justifyItems: 'end',
                  padding: 0,
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  border: 'none',
                },
                body: {
                  padding: 0,
                },
              }}
              closeIcon={<IoMdClose className="text-3xl" />}
            >
              <Menu
                selectedKeys={[pathname]}
                mode="inline"
                items={items}
                onSelect={() => setIsOpen(false)}
                style={{
                  fontSize: '18px',
                }}
              />
            </Drawer>
          </nav>
        </NavHeader>
      </section>
      <nav className="bg-primary hidden md:block">
        <div className="container">
          <Menu
            theme="dark"
            selectedKeys={[pathname]}
            mode="horizontal"
            items={items}
          />
        </div>
      </nav>
    </section>
  );
}
