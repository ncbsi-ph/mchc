'use client';
import { CareersTypes } from '@/app/(general)/careers/page';
import { Empty, Input } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

interface CareersClientProps {
  data: CareersTypes[];
}

const DATE_FORMAT = 'MMMM DD, YYYY';

export default function CareersClient({ data }: CareersClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCareers = data.filter((career: CareersTypes) =>
    career.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  return (
    <div>
      <div className="mb-10">
        <Input
          size="large"
          placeholder="Search for Job's title"
          name="doctors-name"
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
      </div>
      <div className="grid gap-y-5">
        {filteredCareers.length < 1 ? (
          <Empty />
        ) : (
          filteredCareers.map((career, i) => (
            <div key={i} className="group flex flex-col lg:flex-row">
              <div className="bg-milk py-5 px-4 grow rounded-t-md lg:rounded-tr-none lg:rounded-bl-md">
                <div>
                  <h2 className="text-primary font-semibold text-xl pb-5 uppercase">
                    {career.title}
                  </h2>
                  <div className="flex gap-x-5">
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium">Slots</label>
                      <span>{career.slots}</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium">Date Posted</label>
                      <span>
                        {dayjs(career.date_modified).format(DATE_FORMAT)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href={`/careers/${career.id}/${career.slug}`}
                className="grid justify-center py-3 border-2 bg-milk group-hover:bg-gray-200 flex-shrink-0 lg:border-0 items-center lg:px-5 rounded-b-md lg:rounded-bl-none lg:rounded-tr-md"
              >
                <span className="group-hover:underline underline-offset-2 group-hover:text-primary">
                  View Details
                </span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
