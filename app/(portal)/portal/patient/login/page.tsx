'use client';

import Spinner from '@/app/(portal)/spinner';
import { usePatientUserActions } from '@/app/store';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { login } from '@/app/api/auth';
import { forgotPassword } from '@/app/api';
import ForgotPassword from '@/app/(portal)/forgotPassword';
import Link from 'next/link';
import Image from 'next/image';

interface LoginFormValueTypes {
  email: string;
  password: string;
}

export default function PatientLogin() {
  const { setUser } = usePatientUserActions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotpasswordForm] = Form.useForm();
  const [isSubmittingForgotPass, setIsSubmittingForgotPass] = useState(false);
  const access_token = Cookies.get('mchc_patient_access_token');

  useEffect(() => {
    if (access_token) {
      router.push('/portal/patient');
    } else {
      setIsLoggedIn(false);
    }
  }, [access_token, router]);

  const handleLogin = async (values: LoginFormValueTypes) => {
    try {
      setIsLoading(true);
      const response = await login(values, 'patient');
      const { email, patientno, token, access_token } = response;
      setUser(email, patientno, token);
      Cookies.set('mchc_patient_access_token', access_token, {
        path: '/',
        expires: 2,
      });
      setIsLoggedIn(true);
      router.push('/portal/patient');
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

  const handleOpenModal = () => {
    forgotpasswordForm.resetFields();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForgotPassword = async (values: any) => {
    try {
      setIsSubmittingForgotPass(true);
      const response = await forgotPassword(values.email, 'patient');
      messageApi.success(response);
      setIsModalOpen(false);
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      console.log(err);
    } finally {
      setIsSubmittingForgotPass(false);
    }
  };
  return isLoggedIn ? (
    <Spinner />
  ) : (
    <section className="bg-[url('/onc_building.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="max-w-md grid m-auto h-screen content-center">
        {contextHolder}
        <div className="grid pb-12 justify-center">
          <Image
            src="/mchc_with_text.png"
            width={250}
            height={0}
            alt="MCHC logo"
          />
        </div>
        <div className="bg-white shadow-md px-10 py-12 rounded-md">
          <h1 className="font-medium text-xl text-center pb-10 text-primary font-yeseva">
            Patient Portal | <span className="text-slate-500">Login</span>
          </h1>
          <Form layout="vertical" requiredMark={false} onFinish={handleLogin}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex justify-between items-center">
              <ForgotPassword
                form={forgotpasswordForm}
                open={isModalOpen}
                onOpenModal={handleOpenModal}
                onCloseModal={handleCloseModal}
                onSubmit={handleSubmitForgotPassword}
                loading={isSubmittingForgotPass}
              />
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Login
              </Button>
            </div>

            <Link href="/portal/patient/register">
              <p className="text-primary text-center mt-10 text-xs">
                Don&apos;t have an account yet? Register here
              </p>
            </Link>
          </Form>
        </div>
      </div>
    </section>
  );
}
