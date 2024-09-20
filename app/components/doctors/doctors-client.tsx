'use client';

import { DoctorSpecialties, DoctorsTypes } from '@/app/(general)/doctors/page';
import { Empty, Input, Pagination, Select } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

interface DoctorClientProps {
  doctors: DoctorsTypes[];
  specialties: DoctorSpecialties[];
}

const ITEMS_PER_PAGE = 10;

export default function DoctorsClient({
  doctors,
  specialties,
}: DoctorClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = doctors.filter(
    (doctor: DoctorsTypes) =>
      (doctor.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.fname.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterSpecialty === '' ||
        doctor?.specialty?.some((s) =>
          s.specialty.toLowerCase().includes(filterSpecialty.toLowerCase())
        ))
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset the current page when searching
  };

  const handleFilter = (value: string) => {
    if (value !== undefined) {
      setFilterSpecialty(value);
      setCurrentPage(1); // Reset the current page when searching
    }
  };

  const totalItems = filteredData.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = filteredData.slice(startIndex, endIndex);
  return (
    <div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Input
          size="large"
          placeholder="Search for Doctor's Name"
          name="doctors-name"
          className="lg:col-span-2"
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
        <Select
          size="large"
          placeholder="Specilization"
          className="w-full"
          options={specialties.map((specialty) => ({
            value: specialty.specialty,
            label: specialty.specialty,
          }))}
          virtual={false}
          onChange={handleFilter}
          allowClear
          onClear={() => setFilterSpecialty('')}
          getPopupContainer={(trigger) => trigger.parentElement}
        />
      </div>

      {paginatedData.length < 1 ? (
        <Empty />
      ) : (
        <div className="grid gap-y-10 md:gap-y-5">
          {paginatedData.map((doctor, i) => (
            <div key={i}>
              <div className="bg-milk rounded-md overflow-hidden grid md:grid-cols-3 lg:grid-cols-5">
                <div className="w-full h-44  bg-gray-50 relative md:h-full  grid justify-center items-center">
                  <Image
                    src={doctor.img}
                    alt={doctor.lname}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    quality={50}
                    className="p-5"
                  />
                </div>

                <div className="py-5 px-4 grid gap-5 md:col-span-2 lg:col-span-4 lg:grid-cols-2">
                  <div className="flex flex-col gap-y-1 lg:gap-2">
                    <h2 className="text-xl font-medium md:text-lg uppercase">
                      {`${doctor.fname} ${
                        doctor.mname === null ? '' : doctor.mname
                      } ${doctor.lname} `}
                    </h2>
                    <div className="md:text-sm">
                      <label className="block text-slate-600 ">Specialty</label>
                      <ul className="uppercase font-medium">
                        {doctor.specialty.length === 0
                          ? '-'
                          : doctor.specialty.map((s) => s.specialty).join('-')}
                      </ul>
                    </div>
                    <div className="md:text-sm">
                      <label className="block text-slate-600">Schedule</label>
                      <span className="uppercase font-medium ">
                        {doctor.schedule === undefined ? '-' : doctor.schedule}
                      </span>
                    </div>
                  </div>

                  <div className="md:text-sm">
                    <h3 className="uppercase font-medium">Secretary</h3>
                    <ul>
                      <li className="text-slate-600">
                        Name:
                        <span className="uppercase font-medium text-black">
                          {doctor.secretary_name === null
                            ? '-'
                            : doctor.secretary_name}
                        </span>
                      </li>
                      <li className="text-slate-600">
                        Contact No.:
                        <span className="uppercase font-medium text-black">
                          {doctor.secretary_contact === null
                            ? '-'
                            : doctor.secretary_contact}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-10 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={ITEMS_PER_PAGE}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
