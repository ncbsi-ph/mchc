'use client';

import { resetPassword } from '@/app/api';
import { Form, message } from 'antd';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import ResetPasswordForm from '../../resetPasswordForm';
import Countdown from '../../countdown';

type Params = {
  params: {
    token: string;
  };
};

export default function DoctorForgotPassword({ params: { token } }: Params) {
  if (token.length !== 36) {
    notFound();
  }

  const [isLoading, setIsLoading] = useState(false);
  const [resetForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [countdownStarted, setCountdownStarted] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await resetPassword(token, values.password, 'doctor');
      messageApi.success(response);
      resetForm.resetFields();
      setCountdownStarted(true);
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <ResetPasswordForm
        onSubmit={handleSubmit}
        loading={isLoading}
        form={resetForm}
      />

      <Countdown
        countdownStarted={countdownStarted}
        pushTo="/portal/doctor/login"
        title="Doctor portal"
      />
    </div>
  );
}
