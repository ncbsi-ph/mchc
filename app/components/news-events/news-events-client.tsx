'use client';
import { NewsEventsTypes } from '@/app/(general)/news-events/page';
import { Dropdown, MenuProps, Pagination } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BsSortNumericDown, BsSortNumericUp } from 'react-icons/bs';
import parse from 'html-react-parser';

interface NewsEventsClientProps {
  data: NewsEventsTypes[];
}

type sortType = 'asc' | 'desc';
type filterType = 'news' | 'events-promo' | null;

const ITEMS_PER_PAGE = 10;
const DATE_FORMAT = 'MMMM DD, YYYY';

export default function NewsEventsClient({ data }: NewsEventsClientProps) {
  const [sort, setSort] = useState<sortType>('desc');
  const [filter, setFilter] = useState<filterType>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (value: sortType) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: filterType) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const filteredNews = data
    .filter((item: NewsEventsTypes) =>
      filter === null
        ? data
        : filter === 'events-promo'
        ? item.type !== 'news'
        : item.type === filter
    )
    .sort((a, b) => {
      let order = sort == 'asc' ? 1 : -1;
      return a.date.toLowerCase() < b.date.toUpperCase().toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const totalItems = filteredNews.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = filteredNews.slice(startIndex, endIndex);
  return (
    <div>
      <Sort onSort={handleSort} onFilter={handleFilter} />
      {paginatedData.length > 0 ? (
        <div className="grid gap-10 md:gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {paginatedData.map((item, i) => {
            const type = item.type;
            let bgColor =
              type === 'news'
                ? 'bg-primary text-yellow rounded-md'
                : 'bg-yellow text-primary rounded-md';
            return (
              <div key={i} className="bg-milk rounded-md overflow-hidden group">
                <Link href={`/news-events/${item.id}/${item.slug}`}>
                  <div className="w-full h-52 md:h-44 bg-slate-200 relative">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                      }}
                      quality={50}
                    />
                    <div className="absolute z-10 top-4 left-4">
                      <p
                        className={`py-1.5 px-4 text-sm capitalize ${bgColor}`}
                      >
                        {item.type}
                      </p>
                    </div>
                  </div>
                  <div className="py-5 px-4">
                    <p className="text-gray-500 text-sm lg:text-xs">
                      {dayjs(item.date).format(DATE_FORMAT)}
                    </p>
                    <h4 className="text-2xl font-medium py-1 md:text-xl uppercase">
                      {item.title}
                    </h4>
                    <div className="line-clamp-3 hidden-img">
                      {parse(item.description)}
                    </div>
                    <p className="pt-2 underline text-primary group-hover:text-secondary md:text-sm">
                      Read more
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-60 bg-milk/50 grid place-content-center">
          <p className="uppercase text-gray-300 text-lg">No News & Events</p>
        </div>
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

interface SortProps {
  onSort: (value: sortType) => void;
  onFilter: (value: filterType) => void;
}

const Sort = ({ onSort, onFilter }: SortProps) => {
  const dateItems: MenuProps['items'] = [
    {
      key: '1',
      label: <p onClick={() => onSort('asc')}>ascend</p>,
      icon: <BsSortNumericUp className="text-2xl" />,
    },
    {
      key: '2',
      label: <p onClick={() => onSort('desc')}>descend</p>,
      icon: <BsSortNumericDown className="text-2xl" />,
    },
  ];
  const typeItems: MenuProps['items'] = [
    {
      key: '1',
      label: <p onClick={() => onFilter(null)}>All</p>,
    },
    {
      key: '2',
      label: <p onClick={() => onFilter('news')}>News</p>,
    },
    {
      key: '3',
      label: <p onClick={() => onFilter('events-promo')}>Events & Promo</p>,
    },
  ];
  return (
    <div className="flex gap-x-3 justify-end pb-5">
      <div>
        <span className="font-medium">Sort: </span>
      </div>{' '}
      <div className="flex gap-x-2 cursor-pointer">
        <Dropdown
          menu={{
            items: dateItems,
            selectable: true,
            defaultSelectedKeys: ['2'],
          }}
          className="w-fit"
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex items-center">
            <p>Date</p>
            <BiChevronDown className="text-xl" />
          </div>
        </Dropdown>
        <Dropdown
          menu={{
            items: typeItems,
            selectable: true,
            defaultSelectedKeys: ['1'],
          }}
          className="w-fit"
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex items-center">
            <p>Type</p>
            <BiChevronDown className="text-xl" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
