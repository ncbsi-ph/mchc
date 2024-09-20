'use client';

import { verifyPatient } from '@/app/api';
import { Button, Result, Spin } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Params = {
  params: {
    token: string;
  };
};

export default function VerifyPatient({ params: { token } }: Params) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState<string | React.ReactNode>('');

  const verifyEmail = async () => {
    try {
      setIsLoading(true);
      const res = await verifyPatient(token);
      setResponse(res);
      setIsSuccess(true);
    } catch (err: any) {
      setIsSuccess(false);
      if (err.response) {
        setResponse(err.response?.data);
      } else {
        setResponse(
          <p>
            We encountered an issue while verifying your email address. Please
            try again later or contact our support team at{' '}
            <a
              href="mailto:customerservice@mchc.com.ph"
              target="_blank"
              className="underline underline-offset-1 lg:text-sm"
            >
              customerservice@mchc.com.ph
            </a>{' '}
            for assistance.
          </p>
        );
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  });

  return (
    <div className="h-screen grid content-center">
      {!isLoading && (
        <div className="grid pb-12 justify-center">
          <Image
            src="/mchc_with_text.png"
            width={250}
            height={0}
            alt="Comlogik medical logo"
          />
        </div>
      )}
      {isLoading ? (
        <Spin />
      ) : isSuccess ? (
        <Result
          status="success"
          title="Email Verification Successful"
          subTitle={response}
          extra={[
            <Link href="/portal/patient/login" key="login-link">
              <Button type="primary" key="console">
                Click here to go in the login page
              </Button>
            </Link>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Email Verification Error"
          subTitle={response}
        />
      )}
    </div>
  );
}
