'use client';

import { CTScanTypes } from '@/app/(general)/services/ct-scan/page';
import { Empty, Input, Pagination } from 'antd';
import { useState } from 'react';

interface CTScanClientProps {
  data: CTScanTypes[];
}

const ITEMS_PER_PAGE = 20;

export default function CTScanClient({ data }: CTScanClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((service: CTScanTypes) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredData.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset the current page when searching
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = filteredData.slice(startIndex, endIndex);
  return (
    <div>
      <div className="pb-10">
        <Input
          placeholder="Search for Laboratory Services"
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {paginatedData.length > 0 ? (
        <ul>
          {paginatedData.map((service, i) => (
            <li key={i} className="p-2 odd:bg-altGray">
              {service.name}
            </li>
          ))}
        </ul>
      ) : (
        <Empty />
      )}

      <div className="pt-10 flex justify-center">
        {' '}
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
