'use client';

import { SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CountdownProps {
  countdownStarted: boolean;
  pushTo: string;
  title?: string;
}
export default function Countdown({
  countdownStarted,
  pushTo,
  title,
}: CountdownProps) {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    let intervalId;

    if (countdownStarted && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      // @ts-ignore
      clearInterval(intervalId);
    };
  }, [countdownStarted, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      router.push(pushTo);
    }
  }, [seconds]);

  return countdownStarted ? (
    <div className="absolute z-10 top-40 right-1/2 translate-x-1/2">
      <Tag icon={<SyncOutlined spin />} color="processing">
        redirecting to{' '}
        <a href={pushTo} className="underline font-medium">
          {title}
        </a>{' '}
        in {seconds}
      </Tag>
    </div>
  ) : null;
}
