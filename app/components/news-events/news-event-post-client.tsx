'use client';

import { NewsEventsTypes } from '@/app/(general)/news-events/page';
import dayjs from 'dayjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BsFacebook } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import parse from 'html-react-parser';

interface SlugClientProps {
  data: NewsEventsTypes;
}

const DATE_FORMAT = 'MMMM DD, YYYY';

export default function NewsEventsPostClient({ data }: SlugClientProps) {
  const pathname = usePathname();
  const shareUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;
  return (
    <div className="my-24">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          {/* <FaRegCalendarAlt className="text-2xl text-primary" /> */}
          <p className="font-medium text-gray-400">
            {dayjs(data.date).format(DATE_FORMAT)}
          </p>
        </div>
        <div>
          {/* <p className="font-medium">Share this post:</p> */}
          <div className="flex gap-x-2 justify-end cursor-pointer">
            {/* <BsFacebook className="text-2xl" /> */}
            <FacebookShareButton
              url={shareUrl}
              title={data.title}
              className="Demo__some-network__share-button"
            >
              <BsFacebook className="text-2xl lg:text-xl" />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={data.title}
              className="Demo__some-network__share-button"
            >
              <FaXTwitter className="text-2xl lg:text-xl" />
            </TwitterShareButton>
          </div>
        </div>
      </div>

      <div className="grid justify-center my-5">
        <Image
          src={data.thumbnail}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
          alt={data.title}
          priority={true}
          quality={50}
        />
      </div>

      <div className="ck-content">{parse(data.description)}</div>
    </div>
  );
}
