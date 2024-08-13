'use client';

import { HMOTypes } from '@/app/(general)/hmo-approval/page';
import { Empty, Input } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

interface HMOClientProps {
  data: HMOTypes[];
}

export default function HMOClient({ data }: HMOClientProps) {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (value: string) => {
    setFilteredData(
      data.filter((hmo: HMOTypes) =>
        hmo.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className="py-10">
        <Input
          placeholder="Search for HMO Provider"
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
      </div>

      {filteredData.length < 1 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredData.map((item) => (
            <div key={item.id} className=" max-w-52 h-28 relative">
              <Image
                src={item.logo}
                alt={item.name}
                fill
                style={{
                  objectFit: 'contain',
                }}
                quality={50}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
