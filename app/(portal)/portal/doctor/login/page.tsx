'use client';

import ForgotPassword from '@/app/(portal)/forgotPassword';
import Spinner from '@/app/(portal)/spinner';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { doctorLogin } from '@/app/api/auth';
import { useDoctorActions } from '@/app/store';
import { forgotPassword } from '@/app/api';

export default function DoctorLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setDoctor } = useDoctorActions();
  const [forgotpasswordForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmittingForgotPass, setIsSubmittingForgotPass] = useState(false);
  const [loginForm] = Form.useForm();
  const access_token = Cookies.get('mchc_doctor_access_token');

  useEffect(() => {
    if (access_token) {
      router.push('/portal/doctor');
    } else {
      setIsLoggedIn(false);
    }
  });

  const handleLogin = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await doctorLogin(values);
      const { email, doctorcode, token, access_token } = response;
      setDoctor(email, doctorcode, token);
      Cookies.set('mchc_doctor_access_token', access_token, {
        path: '/',
        expires: 2,
      });
      setIsLoggedIn(true);
      router.push('/portal/doctor');
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
      const response = await forgotPassword(values.email, 'doctor');
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
    <section className="bg-[url('/onc_building.jpg')] bg-no-repeat bg-center">
      <div className="max-w-md grid m-auto h-screen content-center">
        {contextHolder}
        <div className="grid pb-12 justify-center">
          <img
            src="/mchc_with_text.png"
            width={250}
            height={0}
            alt="MCHC logo"
          />
        </div>
        <div className="bg-white shadow-md px-10 py-12 rounded-md">
          <h1 className="font-medium text-xl text-center pb-10 text-primary font-yeseva">
            Doctor Portal | <span className="text-slate-500">Login</span>
          </h1>
          <Form
            layout="vertical"
            requiredMark={false}
            form={loginForm}
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  required: true,
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

            <Link href="/portal/doctor/register">
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
