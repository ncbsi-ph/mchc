'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { doctorLog } from '@/app/helpers';
import { Button, Form, Input, Modal, Tag } from 'antd';
import { DoctorRegister, doctorRegister } from '@/app/api';
import Link from 'next/link';

interface DoctorFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  doctorCode: string;
  email: string;
  password: string;
  contactNo: string;
}

const ErrContent = () => (
  <div className="grid gap-y-2">
    <p>
      We encountered an issue while processing your registration. Please try
      again later. If the problem persists, please contact our support team at
      <a
        href="mailto:customerservice@mchc.com.ph"
        target="_blank"
        className="underline underline-offset-1 lg:text-sm"
      >
        customerservice@mchc.com.ph
      </a>
      for assistance.
      <p>We apologize for any inconvenience caused.</p>
    </p>
  </div>
);

export default function RegisterDoctor() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationForm] = Form.useForm();

  useEffect(() => {
    const presence = Cookies.get(doctorLog);
    if (presence) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const presence = Cookies.get(doctorLog);
    if (presence) {
      setIsLoggedIn(true);
      router.push('/portal/doctor');
    }
  }, [isLoggedIn]);

  const handleLogin = async (values: DoctorFormValues) => {
    try {
      setIsLoading(true);
      const {
        firstName,
        middleName,
        lastName,
        doctorCode,
        email,
        password,
        contactNo,
      } = values;
      const payload: DoctorRegister = {
        fname: firstName,
        mname: middleName,
        lname: lastName,
        doctorcode: doctorCode,
        email: email,
        password: password,
        contactno: contactNo,
      };
      const response = await doctorRegister(payload);
      modal.success({
        title: 'Registration Successful!',
        width: 600,
        content: (
          <div className="grid gap-y-2">
            <Tag bordered={false} color="processing">
              {response}
            </Tag>
            <p>
              Thank you for registering! To complete the registration process
              and activate your account, we have sent a verification email to
              the address you provided during registration. Please follow the
              instructions in the email to verify your account.
            </p>
            <p>
              If you don't receive the email within a few minutes, please check
              your spam or junk folder. Additionally, ensure that you provided
              the correct email address during registration.
            </p>
            <p>
              If you encounter any issues or need further assistance, please
              contact our support team at{' '}
              <a
                href="mailto:customerservice@mchc.com.ph"
                target="_blank"
                className="underline underline-offset-1 lg:text-sm"
              >
                customerservice@mlmc.com.ph
              </a>
            </p>
          </div>
        ),
      });
      registrationForm.resetFields();
    } catch (err: any) {
      if (err.response) {
        modal.error({
          width: 400,
          title: 'Registration Error',
          content: err.response?.data,
        });
      } else {
        modal.error({
          width: 600,
          title: 'Registration Error',
          content: <ErrContent />,
        });
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhoneNumber = (rule: any, value: string) => {
    const phoneNumber = String(value);
    if (!phoneNumber.startsWith('09') || phoneNumber.length !== 11) {
      return Promise.reject('Invalid phone number');
    }
    return Promise.resolve();
  };

  return (
    <div className="bg-[url('/onc_building.jpg')] bg-no-repeat bg-center bg-cover ">
      <section className="max-w-2xl grid m-auto min-h-screen content-center ">
        {contextHolder}
        <div className="grid pb-12 justify-center ">
          <img
            src="/mchc_with_text.png"
            width={250}
            height={0}
            alt="MCHC logo"
          />
        </div>
        <div className="bg-white shadow-md px-10 py-12 rounded-md">
          <h1 className=" font-medium text-xl text-center pb-10 text-primary ">
            Doctor Portal | <span className="text-slate-500">Register</span>
          </h1>
          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={handleLogin}
            form={registrationForm}
          >
            <div className="grid md:grid-cols-2 gap-x-5">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="middleName"
                extra="Leave blank if not applicable"
                label="Middle Name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="doctorCode"
                label="Doctor Code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your doctor code!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                    type: 'email',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="contactNo"
                label="Contact No"
                rules={[
                  {
                    required: true,
                    message: 'Please input your contact number!',
                  },
                  {
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="grid md:grid-cols-2 gap-x-5">
              <Form.Item
                name="password"
                label="Password"
                extra="Minimum of 8 characters"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 8,
                    message: 'Minimum password length should be 8 characters',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                hasFeedback
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          'The two passwords that you entered do not match!'
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>

            <div className="flex justify-end">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Register
              </Button>
            </div>

            <Link href="/portal/doctor/login">
              <p className="text-primary text-center mt-10 text-xs">
                Already have an account? Login here
              </p>
            </Link>
          </Form>
        </div>
      </section>
    </div>
  );
}
