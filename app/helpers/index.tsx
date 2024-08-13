'use client';

import Button, { BaseButtonProps } from 'antd/es/button/button';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useEffect, useState } from 'react';

interface SectionTitleProps {
  heading: string;
  subHeading: string;
}
export const SectionTitle = ({ heading, subHeading }: SectionTitleProps) => (
  <div>
    <h3 className="text-altBlack uppercase font-semibold text-lg">
      {subHeading}
    </h3>
    <h2 className=" text-primary font-semibold text-4xl font-montserrat ">
      {heading}
    </h2>
  </div>
);

export const ComponentSize = (): SizeType => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWindowWidth);
      updateWindowWidth();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateWindowWidth);
      }
    };
  }, []);

  let size: SizeType = windowWidth <= 768 ? 'large' : 'middle';
  return size;
};

interface CustomButtonProps {
  children: React.ReactNode;
  type?: BaseButtonProps['type'];
  className?: BaseButtonProps['className'];
  ghost?: boolean;
  htmlType?: 'button' | 'reset' | 'submit' | undefined;
  loading?: boolean;
}
export const CustomBtn = ({
  children,
  type,
  ghost,
  className,
  htmlType,
  loading = false,
}: CustomButtonProps) => {
  return (
    <Button
      ghost={ghost}
      type={type}
      size={ComponentSize()}
      className={className}
      htmlType={htmlType}
      loading={loading}
    >
      {children}
    </Button>
  );
};

export function generateRandomString() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 50; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const patientLog = 'mchc_patient_presence';
export const doctorLog = 'mchc_doctor_presence';
