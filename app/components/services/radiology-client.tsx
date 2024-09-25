'use client';

import { Radiology } from '@/app/(general)/services/radiology-diagnostic-procedures/page';
import { Empty, Input, Pagination } from 'antd';
import { useState } from 'react';

interface RadiologyClientProps {
  data: Radiology[];
  pricesStatus: boolean;
}

const ITEMS_PER_PAGE = 20;
export const RadiologyClient = ({
  data,
  pricesStatus,
}: RadiologyClientProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((service: Radiology) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredData.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = filteredData.slice(startIndex, endIndex);
  return (
    <div>
      <div className="pb-10">
        <Input
          placeholder="Search for Radiology Services"
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {paginatedData.length > 0 ? (
        <ul>
          {paginatedData.map((service) => (
            <li key={service.id} className="p-2 odd:bg-altGray">
              <div className="flex flex-wrap justify-between">
                <p>{service.name}</p>
                {pricesStatus && <p>{service.price}</p>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Empty />
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
};
